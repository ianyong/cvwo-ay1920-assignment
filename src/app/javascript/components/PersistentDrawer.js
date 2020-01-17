import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import TaskList from "./TaskList";
import Fab from "./Fab";

function PersistentDrawer() {
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const styles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }
  }))();

  return (
    <div className={styles.root}>
      <AppBar
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerClose={handleDrawerClose} />
      <main
        className={clsx(styles.content, {
          [styles.contentShift]: open,
        })}>
        <div className={styles.drawerHeader} />
        <TaskList />
        <Fab />
      </main>
    </div>
  );
}

export default PersistentDrawer;