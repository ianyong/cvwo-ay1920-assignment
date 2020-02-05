import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { navigate } from "@reach/router";

class LogoutDialog extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose} // Responsive full-screen
        fullWidth={true}
        maxWidth="md"
        scroll="paper">
        <DialogTitle>
          Log out
        </DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
        <Button
            autoFocus
            onClick={this.logout}
            color="secondary">
            Yes
          </Button>
          <Button
            onClick={this.props.onClose}
            color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LogoutDialog;