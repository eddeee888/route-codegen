/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsLegacy, patternLegacy } from './patternLegacy';
const RedirectLegacy: React.FunctionComponent<UrlPartsLegacy & { fallback?: React.ReactNode }> = props => {
  const to = generateUrl(patternLegacy, {}, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return <>{props.fallback}</>;
};
export default RedirectLegacy;
