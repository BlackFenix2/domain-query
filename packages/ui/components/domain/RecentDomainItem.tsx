import { css } from '@emotion/css';
import { Delete, Search } from '@mui/icons-material';
import { Box, Button, Grid, IconButton } from '@mui/material';
import React from 'react';

import CardDetailItem from './DomainCardDetailItem';

import type { FunctionComponent } from 'react';

interface TitleRow {
  title: string;
  rows: string[];
}

interface Props {
  domain: string;
  activeDomainName?: string;
  onClick?: (domain: string) => void;
  onDelete?: (domain: string) => void;
  registrar: TitleRow;
  nameServers: TitleRow;
  aRecord: TitleRow;
  mxRecord: TitleRow;
}

const recentButtonStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  background: #ffffff;
  padding: 12px;
  font-size: 16px;
  transition: 100ms ease;
  svg {
    display: block;
  }
  &:hover {
    background: #f2f2f2;
    color: black;
  }
`;

const RecentDomainItem: FunctionComponent<Props> = (props) => {
  const { domain, activeDomainName, onClick, onDelete, registrar, nameServers, aRecord, mxRecord } = props;
  const cardDetails = (
    <Box
      sx={{
        padding: '15px 0 15px',
        margin: '0px 20px',
        borderTop: '2px dashed #d8d8d8',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <CardDetailItem title={registrar.title} rows={registrar.rows} />
        </Grid>
        <Grid item xs={3}>
          <CardDetailItem title={nameServers.title} rows={nameServers.rows} />
        </Grid>
        <Grid item xs={3}>
          <CardDetailItem title={aRecord.title} rows={aRecord.rows} />
        </Grid>
        <Grid item xs={3}>
          <CardDetailItem title={mxRecord.title} rows={mxRecord.rows} />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        border: '1px solid #bfbcbc;',
        borderRadius: '18px',
        // borderRadius: "24px",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginTop: '15px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <Button
          className={recentButtonStyle}
          sx={{
            color: 'black',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          onClick={() => {
            if (onClick) onClick(domain);
          }}
          style={{
            justifyContent: 'space-between',
            flexGrow: 1,
            paddingLeft: '20px',
          }}
          endIcon={<Search />}
        >
          {domain}
        </Button>

        <IconButton
          className={recentButtonStyle}
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: '18px',
            borderBottomRightRadius: 0,
          }}
          onClick={() => {
            if (onDelete) onDelete(domain);
          }}
        >
          <Delete />
        </IconButton>
      </Box>
      {!activeDomainName && cardDetails}
    </Box>
  );
};

export default RecentDomainItem;
