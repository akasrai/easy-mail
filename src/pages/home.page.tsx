import { Link } from "react-router-dom";
import React, { useContext } from "react";

import MainLayout from "ui/main.layout";

import { ROUTE } from "app/app.route-path";
import { AuthContext } from "app/app.context";
import CreateEmail from "./components/create-email.component";

const HomePage = () => {
  const { isAuthenticated, email } = useContext(AuthContext);

  return (
    <MainLayout>
      <div className="col-md-5 p-3 p-md-0 m-auto">
        {isAuthenticated && (
          <div className="alert custom-alert-info p-2 mt-4 small">
            Hello! <strong>{email}, </strong>
            you are already logged in. Click to
            <Link className="bold" to={ROUTE.INBOX}>
              Check Inbox
            </Link>
          </div>
        )}
        <h3 className="text-center text-primary mt-5 mb-0">
          <i className="icon ion-md-construct mr-1" />
          Email Generator
        </h3>
        <span className="small text-center mb-4 d-block text-muted">
          All you need is enter a username and start receiving the emails right
          away. Cheers{" "}
          <span role="img" aria-label="star">
            ✨
          </span>
          <span role="img" aria-label="celebrate">
            🎉
          </span>
        </span>
        <CreateEmail className="col-md-12 p-0 mb-3" />
      </div>
    </MainLayout>
  );
};

export default HomePage;
