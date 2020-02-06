import React from "react";
import { navigate } from "@reach/router";
import { Dialog, DialogTitle, DialogActions, Button, Chip, TextField, DialogContent } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

class TagsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagChange = this.handleTagChange.bind(this);
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
    if (response.status === 200) {
      this.setState({
        allTags: data
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

  handleTagChange(event, tags) {
    this.setState({
      tagsFilter: tags
    });
  }

  render() {
    return (
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
            onClick={() => { this.props.onClose(); this.setTagsFilter(); }}
            color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TagsDialog;