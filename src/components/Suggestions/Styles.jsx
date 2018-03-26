// @flow
import styled from "styled-components";

const ItemSuggestions = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
  box-sizing: border-box;
  display: ${props => (props.open ? "block" : "none")};
  font-family: Helvetica, sans-serif;
  left: 0;
  max-width: ${props => props.maxWidth};
  position: absolute;
  width: 100%;
  z-index: 2;

  & > ul.suggestions-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      cursor: pointer;
      padding: 10px 15px;

      &:hover {
        background-color: #eee;
      }
    }
  }
`;

export default ItemSuggestions;
