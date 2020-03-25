import { useHistory } from 'react-router';
import { UrlPartsUser, patternUser } from './patternUser';
import { generateUrl } from 'route-codegen';

const useRedirectUser = (urlParts: UrlPartsUser): (() => void) => {
  const history = useHistory();
  const to = generateUrl(patternUser, urlParts.path, urlParts.urlQuery);
  return () => history.push(to);
};
export default useRedirectUser;
