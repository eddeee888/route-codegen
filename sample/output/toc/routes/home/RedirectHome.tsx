/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsHome, patternHome } from './patternHome';
const RedirectHome: React.FunctionComponent<UrlPartsHome & { fallback?: React.ReactNode }> = props => {
  const to = generateUrl(patternHome, {}, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return <>{props.fallback}</>;
};
export default RedirectHome;
