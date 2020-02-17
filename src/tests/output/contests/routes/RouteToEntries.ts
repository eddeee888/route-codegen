/* This file was automatically generated and should not be edited. */
import createRoute from 'routeCreators/createReactRouterRoute';
export interface RouteToEntriesParams {
  contestId: string;
  entryId?: string;
}
const RouteToEntries = createRoute<RouteToEntriesParams>('/contests/:contestId/entries/:entryId?');

export default RouteToEntries;
