/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsAccount, patternAccount } from './patternAccount';
const RedirectAccount: React.FunctionComponent<UrlPartsAccount> = props => {
  const to = generateUrl(patternAccount, {}, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return null;
};
export default RedirectAccount;
