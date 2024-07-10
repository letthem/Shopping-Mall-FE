import React from "react";
import styled from "styled-components";

const MemberList = ({ member, onDelete }) => {
  const {
    id,
    memberName,
    address: { city, street, zipcode },
  } = member;

  return (
    <MemberListBlock>
      <td>{id}</td>
      <td>{memberName}</td>
      <td>{city}</td>
      <td>{street}</td>
      <td>{zipcode}</td>
      <td>
        <Button onClick={() => onDelete(id)}>🗑️</Button>
      </td>
    </MemberListBlock>
  );
};

const MemberListBlock = styled.tr`
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

export default MemberList;
