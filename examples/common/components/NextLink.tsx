import React, { FunctionComponent } from "react";
import OriginalLink, { LinkProps } from "next/link";

export type NextLinkProps = LinkProps;

const NextLink: FunctionComponent<LinkProps> = ({ children, ...props }) => {
  return (
    <OriginalLink {...props}>
      <a>{children}</a>
    </OriginalLink>
  );
};

export default NextLink;
