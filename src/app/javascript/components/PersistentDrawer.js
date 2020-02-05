import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import TaskList from "./TaskList";
import Fab from "./Fab";

function PersistentDrawer() {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState(localStorage.getItem("date_range_filter") === null
      ? 2 : parseInt(localStorage.getItem("date_range_filter")));
  const [showCompleted, setShowCompleted] = React.useState(localStorage.getItem("show_completed") === null
      ? 0 : parseInt(localStorage.getItem("show_completed")));
  const [update, setUpdate] = React.useState(true); // Dummy state for refreshing component
  const [emptyDisplay, setEmptyDisplay] = React.useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const refreshTaskList = () => {
    setUpdate(!update);
  }

  const styles = makeStyles(theme => ({
    root: {
      display: 'flex',
      minHeight: 'inherit',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      minHeight: 'inherit',
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentEmpty: {
      display: 'flex', // This breaks the task list formatting, but is necessary to center the "No task" text
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
        handleDrawerClose={handleDrawerClose}
        dateRange={dateRange}
        setDateRange={setDateRange}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        refreshTaskList={refreshTaskList} />
      <main
        className={clsx(styles.content, {
          [styles.contentShift]: open,
          [styles.contentEmpty]: emptyDisplay
        })}>
        <div className={styles.drawerHeader} />
        <TaskList
          dateRange={dateRange}
          showCompleted={showCompleted}
          update={update}
          setEmptyDisplay={setEmptyDisplay}
          refreshTaskList={refreshTaskList} />
        <Fab
          refreshTaskList={refreshTaskList} />
      </main>
    </div>
  );
}

export default PersistentDrawer;