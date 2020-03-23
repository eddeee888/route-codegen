import { UserPathParams, patternUser as pattern } from './patternUser';
import { useRouteMatch } from 'react-router';
const useParamsUser = (): UserPathParams => {
  const { path, params } = useRouteMatch<UserPathParams>();
  if (path !== pattern) {
    const error = `You are trying to use useParams for "${pattern}" in "${path}". Make sure you are using the right route link object!`;
    throw new Error(error);
  }
  return params;
};
export default useParamsUser;
