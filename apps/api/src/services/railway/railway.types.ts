/**
 * Railway API response types
 */

export interface ValidateTokenResponse {
  projectToken: {
    projectId: string;
    environmentId: string;
  };
}

export interface GetCurrentUserResponse {
  me: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface GetUserProjectsResponse {
  projects: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        description?: string;
        environments: {
          edges: Array<{
            node: {
              id: string;
              name: string;
            };
          }>;
        };
      };
    }>;
  };
}

export interface GetProjectResponse {
  project: {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetServiceResponse {
  service: {
    id: string;
    name: string;
    templateServiceId?: string;
    projectId: string;
    environmentId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetProjectServicesResponse {
  project: {
    services: {
      edges: Array<{
        node: {
          id: string;
          name: string;
          templateServiceId?: string;
        };
      }>;
    };
  };
}

export interface GetServiceDeploymentsResponse {
  service: {
    deployments: {
      edges: Array<{
        node: {
          id: string;
          status: string;
          createdAt: string;
          finishedAt?: string;
        };
      }>;
    };
  };
}
