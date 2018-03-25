// @flow
import React, { Component } from "react";
import Suggestions from "./../Suggestions/Suggestions";
import { ContainerInput, InputSearch } from "./Styles";

type Props = {
  maxSuggests: number,
  maxWidth: string
};

type State = {
  searchTerm: string
};

class AutoCompleteInput extends Component<Props, State> {
  static defaultProps = {
    maxSuggests: 4,
    maxWidth: "300px"
  };

  state = {
    searchTerm: "",
    open: true
  };

  handleTermChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.currentTarget.value
    });
  };

  render() {
    const { searchTerm, open } = this.state;
    return (
      <ContainerInput htmlFor="autoComplete">
        <InputSearch
          id="autoComplete"
          type="text"
          value={searchTerm}
          onChange={this.handleTermChange}
          placeholder="Search Item"
          open={open && searchTerm.length > 0 ? open : false}
          maxWidth={this.props.maxWidth}
        />
        <Suggestions
          open={open}
          maxWidth={this.props.maxWidth}
          {...this.state}
          {...this.props}
        />
      </ContainerInput>
    );
  }
}

export default AutoCompleteInput;
