import React from "react";
import styled from "styled-components";

const ItemList = ({ item }) => {
  const { id, itemName, itemPrice, stockQuantity } = item;

  return (
    <ItemListBlock>
      <td>{id}</td>
      <td>{itemName}</td>
      <td>{itemPrice}</td>
      <td>{stockQuantity}</td>
    </ItemListBlock>
  );
};

const ItemListBlock = styled.tr`
  td {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export default ItemList;
