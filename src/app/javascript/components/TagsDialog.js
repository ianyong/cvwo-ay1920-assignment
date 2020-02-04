import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

class TagsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsFilter: []
    };
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
        <div>
          {/* <Autocomplete
            className="full-width"
            multiple
            id="tags-filter"
            value={this.state.tagFilter}
            options={allTags.map(option => option.attributes.name)}
            filter={Autocomplete.fuzzyFilter}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                fullWidth />
            )}
            onChange={handleTagChange}
            onBlur={handleLoseFocus} /> */}
        </div>
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