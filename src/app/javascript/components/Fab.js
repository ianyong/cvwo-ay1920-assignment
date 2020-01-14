import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Fab as MaterialFab } from "@material-ui/core";

function Fab() {
  const styles = makeStyles(theme => ({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    }
  }))();

  return (
    <MaterialFab
      className={styles.fab}
      color="primary">
      <AddIcon />
    </MaterialFab>
  );
}

export default Fab;