import React from "react";
import styled from "styled-components";

const OrderDetail = ({ order }) => {
  return (
    <OrderDetailBlock>
      <h3>주문 상세 정보</h3>
      <table>
        <thead>
          <tr>
            <th>주문 ID</th>
            <th>사용자 ID</th>
            <th>상품 ID</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.itemId}>
              <td>{order.id}</td>
              <td>{order.memberId}</td>
              <td>{item.itemId}</td>
              <td>{item.itemName}</td>
              <td>{item.itemPrice}</td>
              <td>{item.orderQuantity}</td>
              <td>{item.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </OrderDetailBlock>
  );
};

const OrderDetailBlock = styled.div`
  margin-top: 20px;
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 20px;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

export default OrderDetail;
