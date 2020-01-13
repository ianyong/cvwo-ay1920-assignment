import React from "react";
import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const AppBar = props => {
  const {
    open,
    drawerWidth,
    handleDrawerOpen
  } = props;

  const styles = makeStyles(theme => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    }
  }))();

  return (
    <MaterialAppBar
      position="fixed"
      className={open ? styles.appBarShift : styles.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={open ? styles.hide : styles.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap>
          Task List
        </Typography>
      </Toolbar>
    </MaterialAppBar>
  );
}

export default AppBar;