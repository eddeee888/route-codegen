/* This file was automatically generated and should not be edited. */
import createRoute from 'routeCreators/createExternalRoute';
export interface RouteToOverviewParams {
  contestId: string;
}
const RouteToOverview = createRoute<RouteToOverviewParams>('/contests/overview/:contestId');

export default RouteToOverview;
