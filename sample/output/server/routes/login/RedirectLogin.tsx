/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsLogin, patternLogin } from './patternLogin';
const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = props => {
  const to = generateUrl(patternLogin, {}, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return <>{props.fallback}</>;
};
export default RedirectLogin;
