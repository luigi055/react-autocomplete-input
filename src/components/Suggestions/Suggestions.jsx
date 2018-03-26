// @flow
import React from "react";
import ItemSuggestions from "./Styles";

type Props = {
  searchTerm: string,
  maxWidth: string,
  updateLocalState: Function,
  updateParentState: Function,
  open: boolean,
  autoCompleteItems: Array<string>,
  includeSearchTerm: boolean,
  maxSuggests: number
};

const Suggestions = ({
  searchTerm,
  maxWidth,
  maxSuggests,
  updateLocalState,
  updateParentState,
  open,
  autoCompleteItems,
  includeSearchTerm
}: Props) => {
  const AutoCompleteList = autoCompleteItems
    .filter(autoCompleteItem => {
      // If the search item is include within the array item this will show
      // all the options which includes the search items
      if (includeSearchTerm) {
        return (
          autoCompleteItem.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
        );
      }
      // By default the autocomplete input will show only the options which
      // search term starts and includes with the search term
      return (
        autoCompleteItem.toLowerCase().search(searchTerm.toLowerCase()) === 0
      );
    })
    .splice(0, maxSuggests);
  return (
    <ItemSuggestions
      open={open && searchTerm.length > 0 ? open : false}
      maxWidth={maxWidth}
    >
      <ul className="suggestions-list">
        {AutoCompleteList.map(autoCompleteItem => (
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
};

Suggestions.selectCompletion = (
  updateLocalState: Function,
  updateParentState: Function
) => (event: SyntheticMouseEvent<HTMLLiElement>) => {
  updateLocalState({
    searchTerm: event.currentTarget.textContent,
    open: false
  });
  updateParentState(event.target.textContent);
};

export default Suggestions;
