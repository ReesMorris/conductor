import { env } from '@/env';
import { createLogger } from '@/libs';
import { GraphQLClient } from 'graphql-request';
import {
  DEPLOY_TEMPLATE_MUTATION,
  GET_PROJECT_QUERY,
  GET_PROJECT_SERVICES_QUERY,
  GET_SERVICE_DEPLOYMENTS_QUERY,
  GET_SERVICE_QUERY,
  VALIDATE_TOKEN_QUERY
} from './railway.queries';
import type {
  DeployTemplateInput,
  DeployTemplateResponse,
  GetProjectResponse,
  GetProjectServicesResponse,
  GetServiceDeploymentsResponse,
  GetServiceResponse,
  ValidateTokenResponse
} from './railway.types';

const log = createLogger('RailwayService');

/**
 * Service for interacting with Railway's GraphQL API
 */
export class RailwayService {
  private client: GraphQLClient;

  constructor(projectToken: string) {
    this.client = new GraphQLClient(env.RAILWAY_API_URL, {
      headers: {
        'Project-Access-Token': projectToken,
        'Content-Type': 'application/json'
      }
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
   * Get project details
   */
  getProject(projectId: string): Promise<GetProjectResponse> {
    return this.client.request<GetProjectResponse>(GET_PROJECT_QUERY, {
      projectId
    });
  }

  /**
   * Deploy a template to a project
   */
  deployTemplate(input: DeployTemplateInput): Promise<DeployTemplateResponse> {
    return this.client.request<DeployTemplateResponse>(
      DEPLOY_TEMPLATE_MUTATION,
      { input }
    );
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
 * Create a Railway service instance with a project token
 */
export const createRailwayService = (projectToken: string): RailwayService => {
  return new RailwayService(projectToken);
};
