/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsSignup, patternSignup } from './patternSignup';
const RedirectSignup: React.FunctionComponent<UrlPartsSignup> = props => {
  const to = generateUrl(patternSignup, {}, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return null;
};
export default RedirectSignup;
