import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const Loader = (props: any) => (
  <Stack height={300} spacing={2}>
    <Skeleton width={118} height={50} animation="wave" />
    <Stack direction="row" justifyContent="space-between">
      <Skeleton width={91} height={25} animation="wave" />
      <Skeleton width={135} height={25} animation="wave" />
    </Stack>
    <Stack direction="row" justifyContent="space-between">
      <Skeleton width={91} height={25} animation="wave" />
      <Skeleton width={118} height={25} animation="wave" />
    </Stack>
    <Skeleton width={118} height={50} animation="wave" />
    <Stack direction="row" justifyContent="space-between">
      <Skeleton width={110} height={25} animation="wave" />
      <Skeleton width={118} height={25} animation="wave" />
    </Stack>
    <Stack direction="row" justifyContent="space-between">
      <Skeleton width={91} height={25} animation="wave" />
      <Skeleton width={135} height={25} animation="wave" />
    </Stack>
  </Stack>
);

export default Loader;
