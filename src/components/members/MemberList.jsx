import React from "react";
import styled from "styled-components";

const MemberList = ({ member }) => {
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

export default MemberList;
