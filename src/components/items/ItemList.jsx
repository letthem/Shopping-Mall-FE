import React from "react";
import styled from "styled-components";

const ItemList = ({ item, onDelete }) => {
  const { id, itemName, itemPrice, stockQuantity } = item;

  return (
    <ItemListBlock>
      <td>{id}</td>
      <td>{itemName}</td>
      <td>{itemPrice}</td>
      <td>{stockQuantity}</td>
      <td>
        <Button onClick={() => onDelete(id)}>🗑️</Button>
      </td>
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

const Button = styled.button`
  border-style: none;
  &:hover {
    background-color: #d0d0d0;
  }
`;

export default ItemList;
