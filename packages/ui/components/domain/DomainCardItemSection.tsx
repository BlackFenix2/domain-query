import { css } from '@emotion/css';
import { Search } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

import type { SvgIconProps } from '@mui/material';
import type { FunctionComponent } from 'react';

interface Props {
  title: string;
  rows?: Array<{ title?: string; value: string }>;
}

const DomainCardItemSection: FunctionComponent<Props> = ({ title = '', rows = [] }) => (
  <Box sx={{ margin: '25px 0' }}>
    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{title}</span>

    {rows?.map((index) => (
      <Box
        key={Math.random()}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
          flexWrap: 'wrap',
        }}
      >
        {index.title && <span>{index.title}</span>}

        <Box
          sx={{
            borderBottom: '1px solid #eeeeee',
            padding: '3px 8px',
          }}
        >
          {index.value?.includes('https://') ? (
            <a target="_blank" rel="noopener noreferrer" href={index.value.slice(Math.max(0, index.value.indexOf('https://')))}>
              {index.value}
            </a>
          ) : (
            index.value
          )}
        </Box>
      </Box>
    )) ?? undefined}
  </Box>
);

export default DomainCardItemSection;
