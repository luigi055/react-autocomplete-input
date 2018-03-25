// @flow
import React, { Component } from "react";

type State = {
  searchTerm: string
};

class AutoCompleteInput extends Component<{}, State> {
  state = {
    searchTerm: ""
  };

  handleTermChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.currentTarget.value
    });
  };

  render() {
    return (
      <label htmlFor="autoComplete">
        Search Input:
        <input
          id="autoComplete"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleTermChange}
          placeholder="Search Item"
        />
      </label>
    );
  }
}

export default AutoCompleteInput;
