import React from 'react';
import { WhiteDottedLoader } from 'ui/icons/loading-icon';

interface ButtonProps {
  name: string;
  icon?: string;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { icon, name, onClick, disabled = false, className } = props;

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${className} btn-block shake`}
    >
      {disabled ? (
        <WhiteDottedLoader />
      ) : (
        <>
          {icon && <i className={`icon ion-${icon} pr-2 d-inline-block`} />}
          {name}
        </>
      )}
    </button>
  );
};
