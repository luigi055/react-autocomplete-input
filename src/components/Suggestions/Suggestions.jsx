// @flow
import React from "react";
import { ItemSuggestions, Suggestion } from "./Styles";

type Props = {
  searchTerm: string,
  maxWidth: string,
  updateLocalState: Function,
  updateParentState: Function,
  open: boolean,
  suggestedItems: Array<string>,
  currentOption: number
};

const Suggestions = ({
  searchTerm,
  maxWidth,
  updateLocalState,
  updateParentState,
  open,
  suggestedItems,
  currentOption
}: Props) => (
  <ItemSuggestions
    open={open && searchTerm.length > 0 ? open : false}
    maxWidth={maxWidth}
  >
    <ul className="suggestions-list">
      {suggestedItems.map(autoCompleteItem => (
        <Suggestion
          key={autoCompleteItem}
          onClick={Suggestions.selectCompletion(
            updateLocalState,
            updateParentState
          )}
          onMouseOver={Suggestions.hoverSuggestion(
            updateLocalState,
            suggestedItems.indexOf(autoCompleteItem)
          )}
          onFocus={Suggestions.hoverFocus}
          active={suggestedItems[currentOption] === autoCompleteItem}
          role="presentation"
        >
          {autoCompleteItem}
        </Suggestion>
      ))}
    </ul>
  </ItemSuggestions>
);

Suggestions.selectCompletion = (
  updateLocalState: Function,
  updateParentState: Function
) => (event: SyntheticMouseEvent<HTMLLiElement>) => {
  updateLocalState({
    searchTerm: event.currentTarget.textContent,
    open: false,
    suggestedItems: []
  });
  updateParentState(event.target.textContent);
};

Suggestions.hoverSuggestion = (
  updateLocalState: Function,
  indexNumber: number
) => () => {
  updateLocalState({
    currentOption: indexNumber
  });
};
// Suggestions.hoverFocus = (event: SyntheticFocusEvent<HTMLLiElement>) => {
//   event.focus();
// };

export default Suggestions;
