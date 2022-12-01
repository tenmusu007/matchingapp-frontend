import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CenterLayout from '../Layout/CenterLayout';

export default function CircularIndeterminate() {
  return (
    <CenterLayout>
      <CircularProgress />
    </CenterLayout>
  );
}
