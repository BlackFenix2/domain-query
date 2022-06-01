import { css } from '@emotion/css';
import { Clear } from '@mui/icons-material';
import React from 'react';

interface Props {
  onClick?: () => void;
}

const clearButtonStyles = css`
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: content;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 13px;
  width: 24px;
  height: 24px;
  font-size: 12px;
  text-decoration: underline;
  background: #ffffff;
  border-radius: 50px;
  padding: 0;
  svg {
    display: block;
    height: 14px;
  }
`;

export const ClearButton = (props: Props) => (
  <button onClick={props.onClick} className={clearButtonStyles}>
    <Clear />
  </button>
);
