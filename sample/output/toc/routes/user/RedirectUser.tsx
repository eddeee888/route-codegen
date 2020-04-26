/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsUser, patternUser } from './patternUser';
const RedirectUser: React.FunctionComponent<UrlPartsUser> = props => {
  const to = generateUrl(patternUser, props.path, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return null;
};
export default RedirectUser;
