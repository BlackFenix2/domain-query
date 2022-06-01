import { Home, Web } from '@mui/icons-material';
import { Divider, List, Paper, Toolbar } from '@mui/material';
import React from 'react';

import NavLink from 'src/components/elements/NavLink';

export const Sidebar = () => (
  <nav>
    <Paper square sx={{ minHeight: '100vh', width: 200 }}>
      <Toolbar disableGutters>
        <NavLink to="/" icon={Home}>
          Home Page
        </NavLink>
      </Toolbar>
      <Divider />
      <List>
        <NavLink to="/Domain" icon={Web}>
          Domain
        </NavLink>
      </List>
    </Paper>
  </nav>
);
