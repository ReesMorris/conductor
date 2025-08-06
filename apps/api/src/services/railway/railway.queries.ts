/**
 * GraphQL queries and mutations for Railway API
 */

/**
 * Validate a project token and get project/environment IDs
 */
export const VALIDATE_TOKEN_QUERY = `
  query ValidateToken {
    projectToken {
      projectId
      environmentId
    }
  }
`;

/**
 * Get project details
 */
export const GET_PROJECT_QUERY = `
  query GetProject($projectId: String!) {
    project(id: $projectId) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

/**
 * Deploy a template to a project
 */
export const DEPLOY_TEMPLATE_MUTATION = `
  mutation DeployTemplate($input: TemplateDeployInput!) {
    templateDeploy(input: $input) {
      projectId
      workflowId
    }
  }
`;

/**
 * Get service details including URLs
 */
export const GET_SERVICE_QUERY = `
  query GetService($serviceId: String!) {
    service(id: $serviceId) {
      id
      name
      templateServiceId
      projectId
      environmentId
      createdAt
      updatedAt
    }
  }
`;

/**
 * Get services for a project
 */
export const GET_PROJECT_SERVICES_QUERY = `
  query GetProjectServices($projectId: String!, $environmentId: String!) {
    project(id: $projectId) {
      services(environmentId: $environmentId) {
        edges {
          node {
            id
            name
            templateServiceId
          }
        }
      }
    }
  }
`;

/**
 * Get deployments for a service
 */
export const GET_SERVICE_DEPLOYMENTS_QUERY = `
  query GetServiceDeployments($serviceId: String!, $first: Int) {
    service(id: $serviceId) {
      deployments(first: $first) {
        edges {
          node {
            id
            status
            createdAt
            finishedAt
          }
        }
      }
    }
  }
`;
