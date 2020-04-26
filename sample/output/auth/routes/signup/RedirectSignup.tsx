/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react';
import { generateUrl } from 'route-codegen';
import { Redirect } from 'react-router';
import { UrlPartsSignup, patternSignup } from './patternSignup';
const RedirectSignup: React.FunctionComponent<UrlPartsSignup> = props => {
  const to = generateUrl(patternSignup, {}, props.urlQuery);
  return <Redirect to={to} />;
};
export default RedirectSignup;
