/* This file was automatically generated and should not be edited. */
import createRoute from 'routeCreators/createExternalRoute';
export interface RouteToContestParams {
  contestId: string;
}
const RouteToContest = createRoute<RouteToContestParams>('/contests/:contestId');

export default RouteToContest;
