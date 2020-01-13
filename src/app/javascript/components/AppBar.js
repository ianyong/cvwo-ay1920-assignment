import React from "react";
import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const AppBar = props => {
  const {
    handleDrawerOpen
  } = props;

  return (
    <MaterialAppBar
      position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          edge="start">
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