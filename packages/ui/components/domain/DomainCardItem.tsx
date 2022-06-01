import { css } from '@emotion/css';
import { LaunchOutlined } from '@mui/icons-material';
import { Box, Card } from '@mui/material';
import React from 'react';

import Loader from '../Loader';

import type { FunctionComponent } from 'react';

interface Props {
  title: string;
  icon?: JSX.Element;
  href?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const cardTitle = css`
  padding: 8px 0;
  font-size: 13px;
  svg {
    display: block;
    margin-right: 4px;
    height: 18px;
  }
`;

const launchIcon = css`
  font-size: 13px;

  svg {
    display: block;
    margin-right: 4px;
    height: 12px;
  }
`;

const DomainCardItem: FunctionComponent<Props> = (props) => {
  const { title, icon, href, isLoading, children } = props;

  return (
    <Box sx={{ marginBottom: '30px', fontSize: '13px', position: 'relative' }}>
      <a
        href={href}
        target="_blank"
        className={cardTitle}
        rel="noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '100px',
          color: '#1e76ba',
          fontWeight: 'bold',
          textDecoration: 'none',
          marginBottom: '-5px',
        }}
      >
        <span className={cardTitle}>{icon}</span>
        <span>{title}</span>
      </a>
      <Card
        raised
        className={css`
          border-radius: 14px;
          padding: 0 20px;
          min-height: 420px;
          overflow-x: auto;
          overflow-x: hidden;
        `}
      >
        {isLoading ? (
          <Box
            className={css`
              margin-top: 15px;
            `}
            sx={{ marginTop: '15px' }}
          >
            <Loader />
          </Box>
        ) : (
          <>
            {href && (
              <a
                href={href}
                target="_blank"
                className={cardTitle}
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 0,
                  color: '#333333',
                  textDecoration: 'none',
                  marginBottom: '-5px',
                }}
              >
                <Box className={launchIcon}>
                  <LaunchOutlined />
                </Box>
              </a>
            )}

            {children}
          </>
        )}
      </Card>
    </Box>
  );
};

export default DomainCardItem;
