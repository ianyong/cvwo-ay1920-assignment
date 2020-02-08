import React from "react";
import { navigate } from "@reach/router";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Snackbar } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import UpdateUserDetailsForm from "./UpdateUserDetailsForm";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class UpdateUserDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.setWrongPassword = this.setWrongPassword.bind(this);
    this.setEmailExists = this.setEmailExists.bind(this);
    this.setUserDetails = this.setUserDetails.bind(this);
    this.openWrongPasswordAlert = this.openWrongPasswordAlert.bind(this);
    this.closeWrongPasswordAlert = this.closeWrongPasswordAlert.bind(this);
    this.openEmailExistsAlert = this.openEmailExistsAlert.bind(this);
    this.closeEmailExistsAlert = this.closeEmailExistsAlert.bind(this);
    this.openSuccessAlert = this.openSuccessAlert.bind(this);
    this.closeSuccessAlert = this.closeSuccessAlert.bind(this);
    this.state = {
      buttonEnabled: false,
      wrongPassword: false,
      emailExists: false,
      userDetails: {},
      wrongPasswordAlertOpen: false,
      emailExistsAlertOpen: false,
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

  setEmailExists(value) {
    this.setState({
      emailExists: value
    });
  }

  setUserDetails(user) {
    this.setState({
      userDetails: user
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

  openEmailExistsAlert() {
    this.setState({
      emailExistsAlertOpen: true
    });
  }

  closeEmailExistsAlert() {
    this.setState({
      emailExistsAlertOpen: false
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

  handleUpdate = () => {
    const updateTask = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/users/details/", {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": token
        },
        body: JSON.stringify({
          first_name: this.state.userDetails.firstName,
          last_name: this.state.userDetails.lastName,
          email: this.state.userDetails.email,
          current_password: this.state.userDetails.currentPassword
        })
      })
      const { error } = await response.json();
      if (response.status === 200) {
        // Successfully updated user details
        this.props.onClose();
        this.openSuccessAlert();
        this.props.getUserInfo();
      } else if (response.status === 400) {
        if (error === "Invalid password") {
          // Invalid password
          this.setWrongPassword(true);
          this.openWrongPasswordAlert();
        } else if (error === "Unable to save user details") {
          // Email already in use
          this.setEmailExists(true);
          this.openEmailExistsAlert();
        }
      } else {
        navigate("/login");
      }
    };
    updateTask();
  };

  componentDidUpdate(prevProps) {
    if (this.props.userDetails != prevProps.userDetails
        || this.props.refreshUserDetailsForm != prevProps.refreshUserDetailsForm) {
      this.setState({
        userDetails: {
          firstName: this.props.userDetails.first_name,
          lastName: this.props.userDetails.last_name,
          email: this.props.userDetails.email,
          currentPassword: ""
        }
      });
    }
  }

  validationSchema = Yup.object({
    firstName: Yup.string()
                  .required("First name is required"),
    lastName: Yup.string()
                  .required("Last name is required"),
    email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
    currentPassword: Yup.string()
                  .min(6, "Password must contain at least 6 characters")
                  .required("Password is required")
  });

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
              initialValues={this.state.userDetails}
              validationSchema={this.validationSchema}
              validateOnMount="true">
              {props => <UpdateUserDetailsForm
                          {...props}
                          emailExists={this.state.emailExists}
                          setEmailExists={this.setEmailExists}
                          wrongPassword={this.state.wrongPassword}
                          setWrongPassword={this.setWrongPassword}
                          enableButton={this.enableButton}
                          disableButton={this.disableButton}
                          setUserDetails={this.setUserDetails} />}
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
          open={this.state.emailExistsAlertOpen}
          autoHideDuration={2000}
          onClose={this.closeEmailExistsAlert}>
          <Alert
            onClose={this.closeEmailExistsAlert}
            severity="warning">
            Email is already in use
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.successAlertOpen}
          autoHideDuration={2000}
          onClose={this.closeSuccessAlert}>
          <Alert
            onClose={this.closeSuccessAlert}
            severity="success">
            Successfully updated user account details
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default UpdateUserDetailsDialog;