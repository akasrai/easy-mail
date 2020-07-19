import React from 'react';

interface HrProps {
  className?: string;
}

const Hr = (props: HrProps) => {
  const { className = '' } = props;

  return <hr className={`${className}`} />;
};

export default Hr;
