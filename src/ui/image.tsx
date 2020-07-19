import React from 'react';

interface ImageProps {
  src: string;
  className?: string;
}

const Image = (props: ImageProps) => {
  const { src, className } = props;
  return (
    <div className={`${className}`}>
      <img alt="media" src={src} />
    </div>
  );
};

export default Image;
