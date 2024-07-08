import React from "react";
import styled from "styled-components";

const OrderList = ({ orders }) => {
  return (
    <OrderListBlock>
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
          {orders.map((order) =>
            order.items.map((item) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.memberId}</td>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td>{item.itemPrice}</td>
                <td>{item.orderQuantity}</td>
                <td>{item.orderStatus}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </OrderListBlock>
  );
};

const OrderListBlock = styled.div`
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

export default OrderList;
