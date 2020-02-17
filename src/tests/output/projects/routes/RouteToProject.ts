/* This file was automatically generated and should not be edited. */
import createRoute from 'routeCreators/createReactRouterRoute';
export interface RouteToProjectParams {
  projectId: string;
  tab?:'overview'|'activity'|'files'|'payments';
}
const RouteToProject = createRoute<RouteToProjectParams>('/projects/:projectId/:tab(overview|activity|files|payments)?');

export default RouteToProject;
