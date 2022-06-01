import { Container } from '@mui/material';
import React from 'react';

import Loader from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
};

export const Primary = () => (
  <Container maxWidth="sm">
    <Loader />
  </Container>
);
