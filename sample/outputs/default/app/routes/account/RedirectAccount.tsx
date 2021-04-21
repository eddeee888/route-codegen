/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react'
  import {generateUrl,} from '@route-codegen/utils'
  import {Redirect,} from 'react-router'
  import {UrlPartsAccount,patternAccount,} from './patternAccount'
  export const RedirectAccount: React.FunctionComponent<UrlPartsAccount & { fallback?: React.ReactNode }> = props => {
    const to = generateUrl({ pattern: patternAccount, path: {}, query: props.query, origin: props.origin);
    return (
      <>
        <Redirect to={to} />
        {props.fallback}
      </>
    );
  };