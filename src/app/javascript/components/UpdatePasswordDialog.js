import React from "react";
import { navigate } from "@reach/router";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Snackbar } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import UpdatePasswordForm from "./UpdatePasswordForm";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class UpdatePasswordDialog extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.setWrongPassword = this.setWrongPassword.bind(this);
    this.openWrongPasswordAlert = this.openWrongPasswordAlert.bind(this);
    this.closeWrongPasswordAlert = this.closeWrongPasswordAlert.bind(this);
    this.openSuccessAlert = this.openSuccessAlert.bind(this);
    this.closeSuccessAlert = this.closeSuccessAlert.bind(this);
    this.setPasswordDetails = this.setPasswordDetails.bind(this);
    this.state = {
      buttonEnabled: false,
      passwordDetails: {},
      wrongPassword: false,
      wrongPasswordAlertOpen: false,
      successAlertOpen: false
    };
  }

  enableButton() {
    this.setState({
      buttonEnabled: true
    });
  }

  disableButton() {
    this.setState({
      buttonEnabled: false
    });
  }

  setWrongPassword(value) {
    this.setState({
      wrongPassword: value
    });
  }

  openWrongPasswordAlert() {
    this.setState({
      wrongPasswordAlertOpen: true
    });
  }

  closeWrongPasswordAlert() {
    this.setState({
      wrongPasswordAlertOpen: false
    });
  }

  openSuccessAlert() {
    this.setState({
      successAlertOpen: true
    });
  }

  closeSuccessAlert() {
    this.setState({
      successAlertOpen: false
    });
  }

  setPasswordDetails(password) {
    this.setState({
      passwordDetails: password
    });
  }

  handleUpdate = () => {
    const updatePassword = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/users/password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": token
        },
        body: JSON.stringify({
          new_password: this.state.passwordDetails.newPassword,
          current_password: this.state.passwordDetails.currentPassword
        })
      })
      const { error } = await response.json();
      if (response.status === 200) {
        // Successfully updated user details
        this.props.onClose();
        this.openSuccessAlert();
      } else if (response.status === 400) {
        if (error === "Invalid password") {
          // Invalid password
          this.setWrongPassword(true);
          this.openWrongPasswordAlert();
        }
      } else {
        navigate("/login");
      }
    };
    updatePassword();
  };

  validationSchema = Yup.object({
    newPassword: Yup.string()
                    .min(6, "Password must contain at least 6 characters")
                    .required("Password is required"),
    confirmNewPassword: Yup.string()
                          .oneOf([Yup.ref('newPassword'), null], "Password does not match")
                          .required("Confirm password is required"),
    currentPassword: Yup.string()
                  .min(6, "Password must contain at least 6 characters")
                  .required("Password is required")
  });

  initialValues = {
    newPassword: "",
    confirmNewPassword: "",
    currentPassword: ""
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          fullWidth={true}
          maxWidth="md"
          scroll="paper">
          <DialogTitle>
            Edit account details
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={this.initialValues}
              validationSchema={this.validationSchema}
              validateOnMount="true">
              {props => <UpdatePasswordForm
                          {...props}
                          wrongPassword={this.state.wrongPassword}
                          setWrongPassword={this.setWrongPassword}
                          enableButton={this.enableButton}
                          disableButton={this.disableButton}
                          setPasswordDetails={this.setPasswordDetails} />}
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.handleUpdate}
              color="secondary"
              disabled={!this.state.buttonEnabled}>
              Update
            </Button>
            <Button
              onClick={this.props.onClose}
              color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.wrongPasswordAlertOpen}
          autoHideDuration={2000}
          onClose={this.closeWrongPasswordAlert}>
          <Alert
            onClose={this.closeWrongPasswordAlert}
            severity="error">
            Current password is invalid
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.successAlertOpen}
          autoHideDuration={2000}
          onClose={this.closeSuccessAlert}>
          <Alert
            onClose={this.closeSuccessAlert}
            severity="success">
            Successfully updated password
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default UpdatePasswordDialog;