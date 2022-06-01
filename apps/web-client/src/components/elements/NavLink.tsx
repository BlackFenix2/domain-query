import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import type { SvgIconProps } from '@mui/material';
import type { FunctionComponent } from 'react';

interface Props {
  to: string;
  icon?: (props: SvgIconProps) => JSX.Element;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const NavLink: FunctionComponent<Props> = (props) => (
  <Link href={props.to} passHref>
    <ListItemButton className={props.className}>
      {props.icon && (
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
      )}
      <ListItemText primary={props.label ?? props.children} />
    </ListItemButton>
  </Link>
);

export default NavLink;
