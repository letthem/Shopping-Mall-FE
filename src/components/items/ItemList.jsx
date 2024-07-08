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
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

export default ItemList;
