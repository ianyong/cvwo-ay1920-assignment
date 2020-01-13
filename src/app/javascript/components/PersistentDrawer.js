import React from "react";
import AppBar from "./AppBar";

function PersistentDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar
        handleDrawerOpen={handleDrawerOpen} />
    </React.Fragment>
  );
}

export default PersistentDrawer;