import React from "react";
import { Drawer as MaterialDrawer, makeStyles, IconButton, Divider } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

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
    </MaterialDrawer>
  );
}

export default Drawer;