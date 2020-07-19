import React from 'react';

interface VrProps {
  className?: string;
}

const Vr = (props: VrProps) => {
  const { className = '' } = props;

  return <div className={`vertical-line ${className}`} />;
};

export default Vr;
