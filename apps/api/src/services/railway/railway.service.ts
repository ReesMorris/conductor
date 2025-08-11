import { env } from '@/env';
import { createLogger } from '@/libs';
import { GraphQLClient } from 'graphql-request';
import {
  GET_PROJECT_QUERY,
  GET_PROJECT_SERVICES_QUERY,
  GET_SERVICE_DEPLOYMENTS_QUERY,
  GET_SERVICE_QUERY,
  GET_TCP_PROXIES_QUERY,
  VALIDATE_TOKEN_QUERY,
  WORKFLOW_STATUS_QUERY
} from './railway.queries';
import type {
  GetCurrentUserResponse,
  GetProjectResponse,
  GetProjectServicesResponse,
  GetServiceDeploymentsResponse,
  GetServiceResponse,
  GetUserProjectsResponse,
  ValidateTokenResponse
} from './railway.types';

const log = createLogger('RailwayService');

/**
 * Service for interacting with Railway's GraphQL API
 */
export class RailwayService {
  private client: GraphQLClient;

  constructor(accessToken: string, isPersonalAccessToken = true) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (isPersonalAccessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    } else {
      headers['Project-Access-Token'] = accessToken;
    }

    this.client = new GraphQLClient(env.RAILWAY_API_URL, {
      headers
    });
  }

  /**
   * Validate a project token and get project/environment IDs
   */
  async validateToken(): Promise<ValidateTokenResponse> {
    try {
      const data =
        await this.client.request<ValidateTokenResponse>(VALIDATE_TOKEN_QUERY);
      return data;
    } catch (error) {
      log.error(error, 'Failed to validate Railway token');
      throw new Error('Invalid Railway token');
    }
  }

  /**
   * Get current authenticated user information
   */
  async getCurrentUser(): Promise<GetCurrentUserResponse> {
    const query = `
      query GetCurrentUser {
        me {
          id
          email
          name
        }
      }
    `;

    try {
      const response = await this.client.request<GetCurrentUserResponse>(query);

      if (!response.me) {
        throw new Error('Unable to fetch user information');
      }

      return response;
    } catch (error) {
      log.error(error, 'Failed to get current user');
      throw new Error('Failed to authenticate with Railway');
    }
  }

  /**
   * Get all projects for the authenticated user
   */
  async getUserProjects(limit = 50): Promise<GetUserProjectsResponse> {
    const query = `
      query GetUserProjects($first: Int!) {
        projects(first: $first) {
          edges {
            node {
              id
              name
              description
              environments(first: 10) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.client.request<GetUserProjectsResponse>(
        query,
        { first: limit }
      );

      return response;
    } catch (error) {
      log.error(error, 'Failed to get user projects');
      throw new Error('Failed to fetch projects from Railway');
    }
  }

  /**
   * Get project details
   */
  getProject(projectId: string): Promise<GetProjectResponse> {
    return this.client.request<GetProjectResponse>(GET_PROJECT_QUERY, {
      projectId
    });
  }

  /**
   * Deploy a template using v2 mutation (for PATs)
   */
  async deployTemplateV2(input: {
    templateId: string;
    serializedConfig: string;
    projectId?: string;
    environmentId?: string;
    teamId?: string;
  }): Promise<{ projectId: string; workflowId: string }> {
    const mutation = `
      mutation templateDeployV2($input: TemplateDeployV2Input!) {
        templateDeployV2(input: $input) {
          projectId
          workflowId
        }
      }
    `;

    try {
      const response = await this.client.request<{
        templateDeployV2: { projectId: string; workflowId: string };
      }>(mutation, { input });

      return response.templateDeployV2;
    } catch (error) {
      log.error(error, 'Failed to deploy template');
      throw error;
    }
  }

  /**
   * Get template details including serializedConfig
   */
  async getTemplate(code: string): Promise<{
    id: string;
    name: string;
    serializedConfig: string;
  }> {
    const query = `
      query GetTemplate($code: String!) {
        template(code: $code) {
          id
          name
          serializedConfig
        }
      }
    `;

    try {
      const response = await this.client.request<{
        template: {
          id: string;
          name: string;
          serializedConfig: string;
        };
      }>(query, { code });

      if (!response.template) {
        throw new Error(`Template with code ${code} not found`);
      }

      return response.template;
    } catch (error) {
      log.error(error, 'Failed to get template');
      throw error;
    }
  }

  /**
   * Get service details including URLs
   */
  getService(serviceId: string): Promise<GetServiceResponse> {
    return this.client.request<GetServiceResponse>(GET_SERVICE_QUERY, {
      serviceId
    });
  }

  /**
   * Get all services for a project
   */
  getProjectServices(projectId: string): Promise<GetProjectServicesResponse> {
    return this.client.request<GetProjectServicesResponse>(
      GET_PROJECT_SERVICES_QUERY,
      {
        projectId
      }
    );
  }

  /**
   * Get deployments for a service
   */
  getServiceDeployments(
    serviceId: string,
    first = 10
  ): Promise<GetServiceDeploymentsResponse> {
    return this.client.request<GetServiceDeploymentsResponse>(
      GET_SERVICE_DEPLOYMENTS_QUERY,
      {
        serviceId,
        first
      }
    );
  }

  /**
   * Check workflow status
   */
  async getWorkflowStatus(
    workflowId: string
  ): Promise<{ status: string; error: string | null }> {
    const response = await this.client.request<{
      workflowStatus: { status: string; error: string | null };
    }>(WORKFLOW_STATUS_QUERY, { workflowId });
    return response.workflowStatus;
  }

  /**
   * Get TCP proxies for a service
   */
  async getTcpProxies(
    environmentId: string,
    serviceId: string
  ): Promise<
    Array<{
      id: string;
      domain: string;
      proxyPort: number;
      applicationPort: number;
    }>
  > {
    const response = await this.client.request<{
      tcpProxies: Array<{
        id: string;
        domain: string;
        proxyPort: number;
        applicationPort: number;
      }>;
    }>(GET_TCP_PROXIES_QUERY, { environmentId, serviceId });
    return response.tcpProxies;
  }

  /**
   * Stage environment changes (for deletion)
   */
  async stageEnvironmentChanges(input: {
    environmentId: string;
    serviceId: string;
  }): Promise<{ changeId: string }> {
    const mutation = `
      mutation stageEnvironmentChanges($environmentId: String!, $payload: EnvironmentConfig!) {
        environmentStageChanges(environmentId: $environmentId, input: $payload) {
          id
        }
      }
    `;

    const payload = {
      services: {
        [input.serviceId]: {
          isDeleted: true
        }
      }
    };

    try {
      const response = await this.client.request<{
        environmentStageChanges: { id: string };
      }>(mutation, {
        environmentId: input.environmentId,
        payload
      });

      return { changeId: response.environmentStageChanges.id };
    } catch (error: any) {
      // Log the actual GraphQL error for debugging
      if (error.response?.errors) {
        console.error(
          'GraphQL errors:',
          JSON.stringify(error.response.errors, null, 2)
        );
      }
      if (error.response?.data) {
        console.error(
          'GraphQL data:',
          JSON.stringify(error.response.data, null, 2)
        );
      }
      log.error(error, 'Failed to stage environment changes');
      throw error;
    }
  }

  /**
   * Commit staged environment changes
   */
  async commitStagedChanges(input: {
    environmentId: string;
    message?: string;
    skipDeploys?: boolean;
  }): Promise<string> {
    const mutation = `
      mutation environmentPatchCommitStaged($environmentId: String!, $message: String, $skipDeploys: Boolean) {
        environmentPatchCommitStaged(
          environmentId: $environmentId
          commitMessage: $message
          skipDeploys: $skipDeploys
        )
      }
    `;

    try {
      const response = await this.client.request<{
        environmentPatchCommitStaged: string;
      }>(mutation, {
        environmentId: input.environmentId,
        message: input.message,
        skipDeploys: input.skipDeploys ?? false
      });

      return response.environmentPatchCommitStaged;
    } catch (error) {
      log.error(error, 'Failed to commit staged changes');
      throw error;
    }
  }

  /**
   * Delete a service from Railway (stages and commits the deletion)
   */
  async deleteService(input: {
    environmentId: string;
    serviceId: string;
  }): Promise<void> {
    try {
      // Stage the deletion
      await this.stageEnvironmentChanges({
        environmentId: input.environmentId,
        serviceId: input.serviceId
      });

      // Commit the staged changes
      await this.commitStagedChanges({
        environmentId: input.environmentId,
        message: 'Delete service',
        skipDeploys: false
      });
    } catch (error) {
      log.error(error, 'Failed to delete service');
      throw error;
    }
  }
}

/**
 * Create a Railway service instance with an access token
 */
export const createRailwayService = (
  accessToken: string,
  isPersonalAccessToken = true
): RailwayService => {
  return new RailwayService(accessToken, isPersonalAccessToken);
};
