import React from 'react';
import { LayoutProps } from './layout.type';

export const FlexRow = ({ children, className = '' }: LayoutProps) => {
  return <div className={`d-flex row m-0 ${className}`}>{children}</div>;
};

export const Flex = ({ children, className = '' }: LayoutProps) => {
  return <div className={`d-flex ${className}`}>{children}</div>;
};
