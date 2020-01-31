import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Fab as MaterialFab } from "@material-ui/core";
import AddUpdateTaskDialog from "./AddUpdateTaskDialog";

const Fab = props => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const styles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    }
  }))();

  const openDialog = () => {
    setDialogOpen(true);
  }

  const closeDialog = () => {
    setDialogOpen(false);
  }

  return (
    <React.Fragment>
      <MaterialFab
        className={styles.fab}
        color="primary"
        onClick={openDialog}>
        <AddIcon />
      </MaterialFab>
      <AddUpdateTaskDialog
        open={dialogOpen}
        onClose={closeDialog}
        refreshTaskList={props.refreshTaskList} />
    </React.Fragment>
  );
}

export default Fab;