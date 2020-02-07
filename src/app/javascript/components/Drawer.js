import React from "react";
import { Drawer as MaterialDrawer, makeStyles, IconButton, Divider, List, ListItem, ListItemText, ListItemIcon, FormControlLabel, Switch, Snackbar } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventNoteIcon from "@material-ui/icons/EventNote";
import LabelIcon from "@material-ui/icons/Label";
import TagsDialog from "./TagsDialog";
import LogoutDialog from "./LogoutDialog";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Drawer = props => {
  const {
    open,
    drawerWidth,
    handleDrawerClose,
    dateRange,
    setDateRange,
    showCompleted,
    setShowCompleted,
    update,
    refreshTaskList
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
      overflowX: 'hidden',
    }
  }))();

  const [tagsDialogOpen, setTagsDialogOpen] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const openTagsDialog = () => {
    setTagsDialogOpen(true);
  };

  const closeTagsDialog = () => {
    setTagsDialogOpen(false);
  };

  const openLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const openAlert = () => {
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const handleDateRangeSelection = (event, index) => {
    localStorage.setItem("date_range_filter", index);
    setDateRange(index);
  };

  const toggleShowCompletedTasks = (event) => {
    let value = showCompleted === 0 ? 1 :0;
    localStorage.setItem("show_completed", value);
    setShowCompleted(value);
    openAlert();
  };

  return (
    <React.Fragment>
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
            selected={dateRange === 0}
            onClick={e => handleDateRangeSelection(e, 0)}>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText
              primary="Today" />
          </ListItem>
          <ListItem
            button
            selected={dateRange === 1}
            onClick={e => handleDateRangeSelection(e, 1)}>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Next 7 days" />
          </ListItem>
          <ListItem
            button
            selected={dateRange === 2}
            onClick={e => handleDateRangeSelection(e, 2)}>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText
              primary="All" />
          </ListItem>
        </List>
        <Divider />
          <List>
            <FormControlLabel
              className="drawer-padding"
              checked={showCompleted === 0 ? false : true}
              onChange={e => toggleShowCompletedTasks(e)}
              control={<Switch color="primary" />}
              label="View all completed tasks"
              labelPlacement="start" />
          </List>
        <Divider />
          <List>
            <ListItem
              button
              onClick={openTagsDialog}>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText
                primary="Set tags" />
            </ListItem>
          </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={openLogoutDialog}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="Log out" />
          </ListItem>
        </List>
      </MaterialDrawer>
      <TagsDialog
        open={tagsDialogOpen}
        onClose={closeTagsDialog}
        update={update}
        refreshTaskList={refreshTaskList} />
      <LogoutDialog
        open={logoutDialogOpen}
        onClose={closeLogoutDialog} />
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={closeAlert}>
        <Alert
          onClose={closeAlert}
          severity="info">
          {showCompleted ? "Showing past completed tasks" : "Hiding past completed tasks"}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Drawer;