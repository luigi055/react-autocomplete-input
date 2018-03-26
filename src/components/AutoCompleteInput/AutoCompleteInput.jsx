// @flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Suggestions from "./../Suggestions/Suggestions";
import { ContainerInput, InputSearch } from "./Styles";

type Props = {
  autoCompleteItems: Array<string>,
  maxWidth: string
};

type State = {
  searchTerm: string,
  open: boolean,
  suggestedItems: Array<string>
};

class AutoCompleteInput extends Component<Props, State> {
  static defaultProps = {
    maxSuggests: 4,
    maxWidth: "300px"
  };

  state = {
    searchTerm: "",
    open: false,
    suggestedItems: []
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = event => {
    // const thisComponent = this.domRef.contains;
    // console.log(thisComponent, e.target);
    // if (!thisComponent || !thisComponent.contains(event.target)) {
    //   this.setState({
    //     open: false
    //   });
    // }
    /* eslint-disable */
    // IT'S BEST PRACTICE TO USE REF INSTEAD
    // I had to use finDOMNode method provisionally since
    // i'm having problems implementing ref
    const thisComponent = ReactDOM.findDOMNode(this);
    /* eslint-enable */
    if (!thisComponent || !thisComponent.contains(event.target)) {
      this.setState({
        open: false
      });
    }
  };

  updateLocalState = state => this.setState(state);

  render() {
    const { searchTerm, open } = this.state;

    return (
      <ContainerInput
        ref={domRef => {
          // Arrow function should not return an assigment
          this.domRef = domRef;
        }}
        className="autocomplete"
      >
        <InputSearch
          type="text"
          onChange={AutoCompleteInput.handleTermChange(this.updateLocalState)}
          onFocus={AutoCompleteInput.handleFocusInput(
            this.updateLocalState,
            searchTerm
          )}
          onKeyDown={AutoCompleteInput.handleCloseAutoComplete(
            this.updateLocalState
          )}
          value={searchTerm}
          placeholder="Enter your Item"
          open={open && searchTerm.length > 0 ? open : false}
          maxWidth={this.props.maxWidth}
        />
        <Suggestions
          open={open}
          maxWidth={this.props.maxWidth}
          updateLocalState={this.updateLocalState}
          {...this.state}
          {...this.props}
        />
      </ContainerInput>
    );
  }
}

AutoCompleteInput.handleTermChange = (updateLocalState: Function) => (
  event: SyntheticInputEvent<HTMLInputElement>
) => {
  // Differences between e.target and e.currentTarget
  // target = element that triggered event. or in other words
  // it could be whatever that's actualy clicked on. It can vary, as this
  // can be within an element that the event was bound to
  // currentTarget = element that listens to event.
  // currentTarget is the element you actually bound the event to.
  // This will never change.

  // Since i accessed to the DOM element that's associated with the event handler
  // I decided, i used currentTarget.

  updateLocalState({
    searchTerm: event.currentTarget.value,
    open: true
  });
};

AutoCompleteInput.handleFocusInput = (
  updateLocalState: Function,
  searchTerm: string
) => (event: SyntheticFocusEvent<HTMLInputElement>) => {
  event.preventDefault();
  /* eslint-disable */
  const open = searchTerm > 0 ? true : false;
  /* eslint-enable */

  updateLocalState({
    open
  });
};

AutoCompleteInput.handleCloseAutoComplete = (updateLocalState: Function) => (
  event: SyntheticKeyboardEvent<HTMLInputElement>
) => {
  // Close autocomplete when press Enter or Esc
  if (event.which === 27) {
    updateLocalState({
      open: false,
      suggestedItems: []
    });
  }
};

export default AutoCompleteInput;
