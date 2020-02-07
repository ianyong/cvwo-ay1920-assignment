import React from "react";
import { Drawer as MaterialDrawer, makeStyles, IconButton, Divider, List, ListItem, ListItemText, ListItemIcon, FormControlLabel, Switch, Snackbar } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventNoteIcon from "@material-ui/icons/EventNote";
import LabelIcon from "@material-ui/icons/Label";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
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
    refreshTaskList,
    userDetails
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
  const [showPastAlertOpen, setShowPastAlertOpen] = React.useState(false);
  const [hidePastAlertOpen, setHidePastAlertOpen] = React.useState(false);
  const [dateTodayAlertOpen, setDateTodayAlertOpen] = React.useState(false);
  const [dateWeekAlertOpen, setDateWeekAlertOpen] = React.useState(false);
  const [dateAllAlertOpen, setDateAllAlertOpen] = React.useState(false);

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

  const openShowPastAlert = () => {
    setShowPastAlertOpen(true);
  };

  const closeShowPastAlert = () => {
    setShowPastAlertOpen(false);
  };

  const openHidePastAlert = () => {
    setHidePastAlertOpen(true);
  };

  const closeHidePastAlert = () => {
    setHidePastAlertOpen(false);
  };

  const openDateTodayAlert = () => {
    setDateTodayAlertOpen(true);
  };

  const closeDateTodayAlert = () => {
    setDateTodayAlertOpen(false);
  };

  const openDateWeekAlert = () => {
    setDateWeekAlertOpen(true);
  };

  const closeDateWeekAlert = () => {
    setDateWeekAlertOpen(false);
  };

  const openDateAllAlert = () => {
    setDateAllAlertOpen(true);
  };

  const closeDateAllAlert = () => {
    setDateAllAlertOpen(false);
  };

  const handleDateRangeSelection = (event, index) => {
    localStorage.setItem("date_range_filter", index);
    setDateRange(index);
    switch (index) {
      case 0:
        openDateTodayAlert();
        break;
      case 1:
        openDateWeekAlert();
        break;
      case 2:
        openDateAllAlert();
        break;
    }
  };

  const toggleShowCompletedTasks = (event) => {
    let value = showCompleted === 0 ? 1 :0;
    localStorage.setItem("show_completed", value);
    setShowCompleted(value);
    showCompleted ? openShowPastAlert() : openHidePastAlert();
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
          <ListItem>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText
              className="user-details"
              primary={userDetails.first_name + " " + userDetails.last_name} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText
              className="user-details"
              primary={userDetails.email} />
          </ListItem>
        </List>
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
        open={dateTodayAlertOpen}
        autoHideDuration={2000}
        onClose={closeDateTodayAlert}>
        <Alert
          onClose={closeDateTodayAlert}
          severity="info">
          Showing tasks due today
        </Alert>
      </Snackbar>
      <Snackbar
        open={dateWeekAlertOpen}
        autoHideDuration={2000}
        onClose={closeDateWeekAlert}>
        <Alert
          onClose={closeDateWeekAlert}
          severity="info">
          Showing tasks due in a week
        </Alert>
      </Snackbar>
      <Snackbar
        open={dateAllAlertOpen}
        autoHideDuration={2000}
        onClose={closeDateAllAlert}>
        <Alert
          onClose={closeDateAllAlert}
          severity="info">
          Showing all tasks
        </Alert>
      </Snackbar>
      <Snackbar
        open={showPastAlertOpen}
        autoHideDuration={2000}
        onClose={closeShowPastAlert}>
        <Alert
          onClose={closeShowPastAlert}
          severity="info">
          Showing past completed tasks
        </Alert>
      </Snackbar>
      <Snackbar
        open={hidePastAlertOpen}
        autoHideDuration={2000}
        onClose={closeHidePastAlert}>
        <Alert
          onClose={closeHidePastAlert}
          severity="info">
          Hiding past completed tasks
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Drawer;