import React from "react";
import { navigate } from "@reach/router";
import { Drawer as MaterialDrawer, makeStyles, IconButton, Divider, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventNoteIcon from '@material-ui/icons/EventNote';

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

  const [selectedIndex, setSelectedIndex] = React.useState(localStorage.getItem("date_range_filter") === null ? 2 : parseInt(localStorage.getItem("date_range_filter")));

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDateRangeSelection = (event, index) => {
    localStorage.setItem("date_range_filter", index);
    setSelectedIndex(index);
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
          selected={selectedIndex === 0}
          onClick={e => handleDateRangeSelection(e, 0)}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText
            primary="Today" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={e => handleDateRangeSelection(e, 1)}>
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Next 7 days" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
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