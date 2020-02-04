import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, Chip, TextField, DialogContent } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

class TagsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: [],
      tagsFilter: []
    };
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
    if (response.status === 500) {
      // Not logged in
      navigate("/login")
    } else {
      this.setState({
        allTags: data
      });
    }
  }

  componentDidMount() {
    this.requestAllTags();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
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
            value={this.state.tagFilter}
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
            )} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={this.props.onClose}
            color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TagsDialog;