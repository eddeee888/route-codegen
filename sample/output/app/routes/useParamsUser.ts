import { pathParamsUser, patternUser as pattern } from './patternUser';
import { useRouteMatch } from 'react-router';
const useParamsUser = (): pathParamsUser => {
  const { path, params } = useRouteMatch<pathParamsUser>();
  if (path !== pattern) {
    const error = `You are trying to use useParams for "${pattern}" in "${path}". Make sure you are using the right route link object!`;
    throw new Error(error);
  }
  return params;
};
export default useParamsUser;
