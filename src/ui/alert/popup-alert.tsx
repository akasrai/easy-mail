import React from 'react';
import Modal from 'react-modal';

import { ReactComponent as InfoIcon } from 'assets/image/info-icon.svg';
import { ReactComponent as BlueSpinner } from 'assets/image/blue-spinner.svg';

Modal.setAppElement('#root');

interface CloseButtonProps {
  action: () => void;
  className?: string;
  toggleConfirmationBox: () => void;
}

interface CloseButtonProps {
  action: () => void;
  className?: string;
  toggleConfirmationBox: () => void;
}

interface ActionButtonsProps {
  action: () => void;
  className: string;
  isTakingAction: boolean;
  toggleConfirmationBox: () => void;
}

interface MessageProps {
  title: string;
  message: string;
  isTakingAction: boolean;
}

interface PopupAlertProps {
  title: string;
  alert: boolean;
  message: string;
  className: string;
  syncAction?: () => void;
  asyncAction?: () => void;
  isTakingAction: boolean;
  toggleConfirmationBox: () => void;
}

const handleConfirmation = async (
  action: () => any,
  toggleConfirmationBox: () => void
) => {
  await action();
  toggleConfirmationBox();
};

const CloseButton = (props: CloseButtonProps) => {
  const { action, className, toggleConfirmationBox } = props;

  return (
    <button
      className={`btn btn-${className} w-25`}
      onClick={function () {
        action();
        toggleConfirmationBox();
      }}
    >
      Close
    </button>
  );
};

const ActionButtons = (props: ActionButtonsProps) => {
  const { action, className, isTakingAction, toggleConfirmationBox } = props;

  return (
    <React.Fragment>
      <button
        disabled={isTakingAction}
        className={`btn btn-${className} mr-2 w-25`}
        onClick={toggleConfirmationBox}
      >
        No
      </button>
      <button
        disabled={isTakingAction}
        className={`btn btn-${className} w-25`}
        onClick={() => handleConfirmation(action, toggleConfirmationBox)}
      >
        Yes
      </button>
    </React.Fragment>
  );
};

const Message = (props: MessageProps) => {
  const { title, message, isTakingAction } = props;

  return (
    <React.Fragment>
      <div className="col-3 m-auto">
        {isTakingAction ? <BlueSpinner /> : <InfoIcon />}
      </div>
      <h3 className="text-muted text-center bold">{title}</h3>
      <label className="col-12 pl-2 pr-2 text-muted text-center">
        {message}
      </label>
    </React.Fragment>
  );
};

export const PopupAlert = (props: PopupAlertProps) => {
  const {
    alert,
    title,
    message,
    className,
    syncAction,
    asyncAction,
    isTakingAction,
    toggleConfirmationBox,
  } = props;

  return (
    <Modal
      isOpen={alert}
      className="modal-dialog modal-md pt-5"
      overlayClassName="modal-open"
    >
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content p-2 pb-3 mt-5">
          <section className="row">
            <div className="col-12">
              <div className="clearfix p-0 pt-2">
                <Message
                  title={title}
                  message={message}
                  isTakingAction={isTakingAction}
                />
              </div>
              <div className="col-12 p-2 clearfix">
                <div className="row justify-content-center m-auto">
                  {asyncAction ? (
                    <ActionButtons
                      action={asyncAction}
                      className={className}
                      isTakingAction={isTakingAction}
                      toggleConfirmationBox={toggleConfirmationBox}
                    />
                  ) : (
                    <CloseButton
                      className={className}
                      action={syncAction || function () {}}
                      toggleConfirmationBox={toggleConfirmationBox}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};
