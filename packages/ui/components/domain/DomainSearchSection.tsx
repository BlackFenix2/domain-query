import { css } from '@emotion/css';
import { Search } from '@mui/icons-material';
import { TextField, Autocomplete, Box, Button } from '@mui/material';
import React from 'react';

import type { FunctionComponent } from 'react';

export interface Props {
  domainSearchName: string;

  isError?: boolean;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  domainSubmitHandler: (domain: string) => void;
}

const DomainSearchSection: FunctionComponent<Props> = ({ domainSearchName, domainSubmitHandler, onChange, isError, errorMessage }) => (
  <Box
    sx={{
      padding: '12px',
      background: '#ffffff',
      maxHeight: '102px',
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: '840px',

        margin: '0 auto',
        padding: '0 0 22px 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#ffffff',
        }}
      >
        <TextField
          required
          helperText={isError ? errorMessage : ''}
          error={isError}
          name="domain-search"
          id="domain-search"
          label="Enter Your Domain"
          variant="outlined"
          value={domainSearchName}
          onChange={onChange}
          fullWidth
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              domainSubmitHandler(domainSearchName);
            }
          }}
          InputProps={{
            style: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
        />

        <Button
          disableElevation
          sx={{ height: '56px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          variant="contained"
          startIcon={<Search fontSize="inherit" />}
          onClick={() => domainSubmitHandler(domainSearchName)}
        >
          Search
        </Button>
      </Box>
    </Box>
  </Box>
);

export default DomainSearchSection;
