/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react';
import { generateUrl } from 'route-codegen';
import { Redirect } from 'react-router';
import { UrlPartsLogin, patternLogin } from './patternLogin';
const RedirectLogin: React.FunctionComponent<UrlPartsLogin> = props => {
  const to = generateUrl(patternLogin, {}, props.urlQuery);
  return (
    <>
      <Redirect to={to} />
      {props.children}
    </>
  );
};
export default RedirectLogin;
