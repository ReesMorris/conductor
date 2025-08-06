import { env } from '@/env';
import { createLogger } from '@/libs';
import { GraphQLClient } from 'graphql-request';
import {
  GET_PROJECT_QUERY,
  GET_PROJECT_SERVICES_QUERY,
  GET_SERVICE_DEPLOYMENTS_QUERY,
  GET_SERVICE_QUERY,
  VALIDATE_TOKEN_QUERY
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
      headers['Authorization'] = `Bearer ${accessToken}`;
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
  getProjectServices(
    projectId: string,
    environmentId: string
  ): Promise<GetProjectServicesResponse> {
    return this.client.request<GetProjectServicesResponse>(
      GET_PROJECT_SERVICES_QUERY,
      {
        projectId,
        environmentId
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
