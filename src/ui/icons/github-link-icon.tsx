import React from 'react';
import { ReactComponent as Github } from 'assets/image/github.svg';

const GithubCornerLink = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    aria-label="View source on GitHub"
    href="https://github.com/akasrai/easy-mail"
    className="github-corner d-md-block d-none"
  >
    <Github />
  </a>
);

export default GithubCornerLink;
