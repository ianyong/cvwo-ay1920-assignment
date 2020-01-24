import React from "react";
import { navigate } from "@reach/router";
import { Drawer as MaterialDrawer, makeStyles, IconButton, Divider, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Drawer = props => {
  const {
    open,
    drawerWidth,
    handleDrawerClose
  } = props;

  const styles = makeStyles(theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerPaper: {
      width: drawerWidth,
    }
  }))();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <MaterialDrawer
      variant="persistent"
      anchor="left"
      open={open}
      className={styles.drawer}
      classes={{
        paper: styles.drawerPaper,
      }}>
      <div
        className={styles.drawerHeader}>
        <IconButton
          onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Log out" />
        </ListItem>
      </List>
    </MaterialDrawer>
  );
}

export default Drawer;