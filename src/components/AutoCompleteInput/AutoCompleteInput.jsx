// @flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Suggestions from "./../Suggestions/Suggestions";
import { ContainerInput, InputSearch } from "./Styles";

type Props = {
  autoCompleteItems: Array<string>,
  maxSuggests: number,
  maxWidth: string,
  includeSearchTerm: boolean,
  labelName: string,
  showLabel: boolean,
  placeholder: string,
  stateName: string,
  parentUpdateState: Function
};

type State = {
  searchTerm: string,
  open: boolean,
  suggestedItems: Array<string>
};

class AutoCompleteInput extends Component<Props, State> {
  static defaultProps = {
    maxSuggests: 4,
    maxWidth: "300px",
    includeSearchTerm: false,
    labelName: "",
    showLabel: false,
    placeholder: ""
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
  // This will update parent state which control this component
  updateParentState = searchTerm => {
    this.props.parentUpdateState({
      [this.props.stateName]: searchTerm
    });
  };

  render() {
    const { searchTerm, open } = this.state;

    return (
      <ContainerInput
        ref={domRef => {
          // Arrow function should not return an assigment
          this.domRef = domRef;
        }}
        className="autocomplete"
        showLabel={this.props.showLabel}
      >
        {this.props.labelName.length > 0 && (
          <span> {this.props.labelName} </span>
        )}
        <InputSearch
          type="text"
          onChange={AutoCompleteInput.handleTermChange(
            this.updateLocalState,
            this.updateParentState,
            this.props.autoCompleteItems,
            this.props.maxSuggests,
            this.props.includeSearchTerm
          )}
          onFocus={AutoCompleteInput.handleFocusInput(
            this.updateLocalState,
            searchTerm,
            this.updateParentState
          )}
          onKeyDown={AutoCompleteInput.handleCloseAutoComplete(
            this.updateLocalState
          )}
          value={searchTerm}
          placeholder={this.props.placeholder}
          open={open && searchTerm.length > 0 ? open : false}
          maxWidth={this.props.maxWidth}
        />
        <Suggestions
          open={open}
          maxWidth={this.props.maxWidth}
          updateLocalState={this.updateLocalState}
          updateParentState={this.updateParentState}
          {...this.state}
          {...this.props}
        />
      </ContainerInput>
    );
  }
}

AutoCompleteInput.handleTermChange = (
  updateLocalState: Function,
  updateParentState: Function,
  autoCompleteItems: Array<string>,
  maxSuggests: number,
  includeSearchTerm: boolean
) => (event: SyntheticInputEvent<HTMLInputElement>) => {
  // Differences between e.target and e.currentTarget
  // target = element that triggered event. or in other words
  // it could be whatever that's actualy clicked on. It can vary, as this
  // can be within an element that the event was bound to
  // currentTarget = element that listens to event.
  // currentTarget is the element you actually bound the event to.
  // This will never change.

  // Since i accessed to the DOM element that's associated with the event handler
  // I defined, i used currentTarget.

  const AutoCompleteList = autoCompleteItems
    .filter(autoCompleteItem => {
      // If the search item is include within the array item this will show
      // all the options which includes the search items
      if (includeSearchTerm) {
        return (
          autoCompleteItem
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) >= 0
        );
      }
      // By default the autocomplete input will show only the options which
      // search term starts and includes with the search term
      return (
        autoCompleteItem
          .toLowerCase()
          .search(event.target.value.toLowerCase()) === 0
      );
    })
    .splice(0, maxSuggests);

  updateLocalState({
    searchTerm: event.currentTarget.value,
    open: true,
    suggestedItems: AutoCompleteList
  });
  updateParentState(event.target.value);
};

AutoCompleteInput.handleFocusInput = (
  updateLocalState: Function,
  searchTerm: string,
  updateParentState: Function
) => (event: SyntheticFocusEvent<HTMLInputElement>) => {
  event.preventDefault();
  /* eslint-disable */
  const open = searchTerm > 0 ? true : false;
  /* eslint-enable */

  updateLocalState({
    open
  });
  updateParentState(searchTerm);
};

AutoCompleteInput.handleCloseAutoComplete = (updateLocalState: Function) => (
  event: SyntheticKeyboardEvent<HTMLInputElement>
) => {
  // Close autocomplete when press Enter or Esc
  if (event.which === 13 || event.which === 27) {
    updateLocalState({
      open: false,
      suggestedItems: []
    });
  }
};

export default AutoCompleteInput;
