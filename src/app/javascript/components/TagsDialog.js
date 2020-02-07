import React from "react";
import { navigate } from "@reach/router";
import { Dialog, DialogTitle, DialogActions, Button, Chip, TextField, DialogContent, Snackbar } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TagsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.state = {
      allTags: [],
      tagsFilter: [],
      alertOpen: false
    };
  }

  openAlert() {
    this.setState({
      alertOpen: true
    });
  }

  closeAlert() {
    this.setState({
      alertOpen: false
    });
  }

  requestAllTags = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch("/api/tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": token
      }
    })
    const { data } = await response.json();
    if (response.status === 200) {
      this.setState({
        allTags: data.sort((x, y) => x.attributes.name > y.attributes.name)
      });
    } else {
      navigate("/login");
    }
  }

  requestTagsFilter = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch("/api/users/filters", {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": token
      }
    })
    const { tags_filter } = await response.json();
    if (response.status === 200) {
      this.setState({
        tagsFilter: tags_filter.split("\u0000").filter(e => e !== "")
      });
    } else {
      navigate("/login");
    }
  }

  setTagsFilter = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch("/api/users/filters", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": token
      },
      body: JSON.stringify({
        tags_filter: this.state.tagsFilter.join("\u0000")
      })
    })
    const { data } = await response.json();
    if (response.status === 200) {
      // Successfully updated tags filter
      this.props.refreshTaskList();
    } else {
      // Failed to update tags filter
      navigate("/login");
    }
  }

  componentDidMount() {
    this.requestAllTags();
    this.requestTagsFilter();
  }

  componentDidUpdate(prevProps) {
    // Update all tags whenever a task is updated
    if (this.props.update != prevProps.update) {
      this.requestAllTags();
    }
  }

  handleTagChange(event, tags) {
    this.setState({
      tagsFilter: tags
    });
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          onClose={() => { this.props.onClose(); this.setTagsFilter(); }}
          fullWidth={true}
          maxWidth="md"
          scroll="paper">
          <DialogTitle>
            Tags
          </DialogTitle>
          <DialogContent>
            <Autocomplete
              multiple
              id="tags-filter"
              value={this.state.tagsFilter}
              options={this.state.allTags.map(option => option.attributes.name)}
              filter={Autocomplete.fuzzyFilter}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Filter"
                  fullWidth />
              )}
              onChange={this.handleTagChange} />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => { this.props.onClose(); this.setTagsFilter(); this.openAlert(); }}
              color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.alertOpen}
          autoHideDuration={2000}
          onClose={this.closeAlert}>
          <Alert
            onClose={this.closeAlert}
            severity="success">
            Tag filters updated
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default TagsDialog;