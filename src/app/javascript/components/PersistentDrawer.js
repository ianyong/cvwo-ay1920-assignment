import React from "react";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

function PersistentDrawer() {
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerClose={handleDrawerClose} />
    </React.Fragment>
  );
}

export default PersistentDrawer;