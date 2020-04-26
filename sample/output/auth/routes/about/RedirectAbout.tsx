/* This file was automatically generated with route-codegen and should not be edited. */
import React, { useEffect } from 'react';
import { generateUrl } from 'route-codegen';
import { UrlPartsAbout, patternAbout } from './patternAbout';
const RedirectAbout: React.FunctionComponent<UrlPartsAbout> = props => {
  const to = generateUrl(patternAbout, props.path, props.urlQuery);
  useEffect(() => {
    if (window && window.location) {
      window.location.href = to;
    }
  }, [to]);
  return <>{props.children}</>;
};
export default RedirectAbout;
