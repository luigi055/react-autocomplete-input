// @flow
import React from "react";
import ItemSuggestions from "./Styles";

type Props = {
  searchTerm: string,
  maxWidth: string,
  updateLocalState: Function,
  updateParentState: Function,
  open: boolean,
  suggestedItems: Array<string>
};

const Suggestions = ({
  searchTerm,
  maxWidth,
  updateLocalState,
  updateParentState,
  open,
  suggestedItems
}: Props) => (
  <ItemSuggestions
    open={open && searchTerm.length > 0 ? open : false}
    maxWidth={maxWidth}
  >
    <ul className="suggestions-list">
      {suggestedItems.map(autoCompleteItem => (
        <li
          key={autoCompleteItem}
          onClick={Suggestions.selectCompletion(
            updateLocalState,
            updateParentState
          )}
          role="presentation"
        >
          {autoCompleteItem}
        </li>
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

export default Suggestions;
