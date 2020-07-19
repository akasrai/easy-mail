import React from 'react';

import Hr from 'ui/form/hr';
import { FlexRow } from './flex';

const Footer = () => (
  <FlexRow className="pt-4 pb-4 text-muted m-0">
    <Hr className="col-12" />
    <span className=" col-12 mt-4 text-center">
      &copy; {new Date().getFullYear()} Easy
      <span className="bold">Mail </span>by{' '}
      <a href="https://akasrai.github.io/" target="_blank">
        Akas
      </a>
    </span>
  </FlexRow>
);

export default Footer;
