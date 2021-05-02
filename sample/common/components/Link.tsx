import React, { FunctionComponent } from "react";
import { Link as RRLink, LinkProps as RRLinkProps } from "react-router-dom";

export interface LinkProps extends Omit<RRLinkProps, "to"> {
  href: string;
}

const Link: FunctionComponent<LinkProps> = ({ href, ...props }) => {
  return <RRLink {...props} to={href} />;
};

export default Link;
