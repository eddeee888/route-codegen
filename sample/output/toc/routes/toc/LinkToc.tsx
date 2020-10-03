/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "src/common/components/Link";
import { UrlPartsToc, patternNextJSToc } from "./patternToc";
type LinkTocProps = Omit<LinkProps, "href"> & UrlPartsToc;
const LinkToc: React.FunctionComponent<LinkTocProps> = ({ path = {}, urlQuery = {}, ...props }) => {
  const pathname = patternNextJSToc;
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...urlQuery,
    },
  };
  return <Link {...props} href={nextHref} />;
};
export default LinkToc;
