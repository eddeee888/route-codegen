import React, { FunctionComponent } from "react";

export interface LinkProps {
  href: string;
}

const Link: FunctionComponent<LinkProps> = (props) => {
  return <a {...props} />;
};

export default Link;
