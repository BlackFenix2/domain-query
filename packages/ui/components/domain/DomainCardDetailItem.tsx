import { css } from '@emotion/css';
import React from 'react';

import type { FunctionComponent } from 'react';

interface Props {
  title: string;
  rows: string[];
}

const CardDetailItem: FunctionComponent<Props> = ({ title, rows }) => (
  <>
    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{title}</span>
    {rows?.map((row: any) => (
      <div
        key={row}
        className={css`
          font-size: 12px;
        `}
      >
        {row}
      </div>
    ))}
  </>
);

export default CardDetailItem;
