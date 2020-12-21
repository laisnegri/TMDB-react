import React from 'react';
import {AppBar, 
        CssBaseline, 
        Toolbar, 
        Typography, 
        InputBase} from '@material-ui/core/';

import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './style';

export const drawerWidth = 280;

export default function Menu() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute"
          className={classes.appBar}>
        <Toolbar>
         <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo" className={classes.logo} />
          <Typography className={classes.title} variant="h5" noWrap>
            Trending
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Pesquisa..."
              style={{ color: '#fff' }}
              classes={{
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
