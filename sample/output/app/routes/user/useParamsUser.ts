import { PathParamsUser, patternUser as pattern } from './patternUser';
import { useRouteMatch } from 'react-router';
const useParamsUser = (): PathParamsUser => {
  const { path, params } = useRouteMatch<PathParamsUser>();
  if (path !== pattern) {
    const error = `You are trying to use useParams for "${pattern}" in "${path}". Make sure you are using the right route link object!`;
    throw new Error(error);
  }
  return params;
};
export default useParamsUser;
