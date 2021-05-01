import React, { FunctionComponent } from "react";

export interface AnchorProps {
  href: string;
}

const Anchor: FunctionComponent<AnchorProps> = (props) => {
  return <a {...props} />;
};

export const CustomAnchor: FunctionComponent<AnchorProps> = (props) => {
  return <a {...props} />;
};

export default Anchor;
