import React, { useEffect } from "react";

export interface RedirectServerSideProps {
  href: string;
  fallback?: React.ReactNode;
}

const RedirectServerSide: React.FunctionComponent<RedirectServerSideProps> = ({ href, fallback }) => {
  useEffect(() => {
    if (window && window.location) {
      window.location.href = href;
    }
  }, [href]);

  return <>{fallback}</>;
};

export default RedirectServerSide;
