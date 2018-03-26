// @flow
import React from "react";
import ItemSuggestions from "./Styles";

type Props = {
  searchTerm: string,
  maxWidth: string,
  updateLocalState: Function,
  open: boolean
};

const Suggestions = ({
  searchTerm,
  maxWidth,
  updateLocalState,
  open
}: Props) => (
  <ItemSuggestions
    open={open && searchTerm.length > 0 ? open : false}
    maxWidth={maxWidth}
  >
    <ul className="suggestions-list">
      <li
        onClick={Suggestions.selectCompletion(updateLocalState)}
        role="presentation"
      >
        Item 1
      </li>
      <li
        onClick={Suggestions.selectCompletion(updateLocalState)}
        role="presentation"
      >
        Item 2
      </li>
      <li
        onClick={Suggestions.selectCompletion(updateLocalState)}
        role="presentation"
      >
        Item 3
      </li>
    </ul>
  </ItemSuggestions>
);

Suggestions.selectCompletion = (updateLocalState: Function) => (
  event: SyntheticMouseEvent<HTMLLiElement>
) => {
  updateLocalState({
    searchTerm: event.currentTarget.textContent,
    open: false,
    suggestedItems: []
  });
};

export default Suggestions;
