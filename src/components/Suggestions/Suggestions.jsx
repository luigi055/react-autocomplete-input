// @flow
import React from "react";
import ItemSuggestions from "./Styles";

type Props = {
  searchTerm: string,
  maxWidth: string,
  open: boolean
};

const Suggestions = ({ searchTerm, maxWidth, open }: Props) => (
  <ItemSuggestions
    open={open && searchTerm.length > 0 ? open : false}
    maxWidth={maxWidth}
  >
    <ul className="suggestions-list">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </ItemSuggestions>
);

export default Suggestions;
