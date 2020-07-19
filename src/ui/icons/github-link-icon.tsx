import React from 'react';
import { ReactComponent as Github } from 'assets/image/github.svg';

const GithubCornerLink = () => (
  <a
    target="_blank"
    className="github-corner"
    rel="noopener noreferrer"
    aria-label="View source on GitHub"
    href="https://github.com/akasrai/easy-mail"
  >
    <Github />
  </a>
);

export default GithubCornerLink;
