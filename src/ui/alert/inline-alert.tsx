import React from 'react';

interface AlertProps {
  message: String;
}

export const ErrorAlert = (props: AlertProps) => {
  const { message } = props;

  return (
    <>
      {message && (
        <div className="alert alert-danger small p-2 d-flex d-flex">
          <i className="icon ion-md-alert mr-2" /> {message}
        </div>
      )}
    </>
  );
};

export const InfoAlert = (props: AlertProps) => {
  const { message } = props;

  return (
    <>
      {message && (
        <div className="alert alert-info small p-2 d-flex">
          <i className="icon ion-md-information-circle-outline mr-2" />{' '}
          {message}
        </div>
      )}
    </>
  );
};

export const WarningAlert = (props: AlertProps) => {
  const { message } = props;

  return (
    <>
      {message && (
        <div className="alert alert-warning small p-2 d-flex">
          <i className="icon ion-md-warning mr-2" /> {message}
        </div>
      )}
    </>
  );
};

export const SuccessAlert = (props: AlertProps) => {
  const { message } = props;

  return (
    <>
      {message && (
        <div className="alert alert-success small p-2 d-flex">
          <i className="icon ion-md-checkmark-circle-outline mr-2" /> {message}
        </div>
      )}
    </>
  );
};
