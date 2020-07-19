import React from 'react';

import { ReactComponent as Signal } from 'assets/image/signal.svg';
import { ReactComponent as DottedLoader } from 'assets/image/dotted-loader.svg';

interface LoaderProps {
  message?: string;
  className?: string;
}

export const WhiteDottedLoader = () => <DottedLoader />;

export const ListeningSignal = ({ className }: LoaderProps) => (
  <div className={className}>
    <Signal />
  </div>
);

export const BlinkTextLoader = (props: LoaderProps) => {
  const { className, message } = props;

  return <p className={`${className} text-blink text-muted`}>{message}</p>;
};
