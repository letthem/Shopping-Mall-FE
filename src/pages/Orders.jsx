import { useState } from "react";
import styled from "styled-components";
import OrderList from "../components/orders/OrderList";
import OrderDetail from "../components/orders/OrderDetail";
import { axiosInstance } from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newOrder, setNewOrder] = useState({
    memberId: "",
    items: [
      {
        itemId: "",
        orderQuantity: "",
      },
    ],
  });
  const [searchMemberId, setSearchMemberId] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [memberErrorMessage, setMemberErrorMessage] = useState("");
  const [orderErrorMessage, setOrderErrorMessage] = useState("");
  const [postErrorMessage, setPostErrorMessage] = useState("");

  const handleSearchChange = (e) => {
    setSearchMemberId(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOrders([]);
    if (searchMemberId) {
      fetchOrders(searchMemberId);
    }
  };

  // 사용자 id로 주문 리스트 조회 (get) - query params
  const fetchOrders = async (memberId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/orders", {
        params: { memberId },
      });
      setOrders(response.data);
    } catch (e) {
      setMemberErrorMessage("존재하지 않는 사용자 ID입니다.");
      console.log(e);
    }
    setLoading(false);
  };

  // 주문 등록 input handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("items.")) {
      const key = name.split(".")[1];
      setNewOrder((prevOrder) => ({
        ...prevOrder,
        items: [
          {
            ...prevOrder.items[0],
            [key]: value,
          },
        ],
      }));
    } else {
      setNewOrder({
        ...newOrder,
        [name]: value,
      });
    }
  };

  // 주문 등록 (post)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostErrorMessage("");
    try {
      const response = await axiosInstance.post("/orders", newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({
        memberId: "",
        items: [
          {
            itemId: "",
            orderQuantity: "",
          },
        ],
      });
    } catch (e) {
      if (
        e.response &&
        e.response.status === 400 &&
        e.response.data[0] === "재고 부족으로 주문이 불가능합니다."
      ) {
        setPostErrorMessage("재고 부족으로 주문을 할 수 없습니다.");
      } else {
        setPostErrorMessage("주문 등록에 실패했습니다.");
      }
      console.log(e);
    }
  };

  const handleOrderSearchChange = (e) => {
    setSearchOrderId(e.target.value);
  };

  const handleOrderSearch = (e) => {
    e.preventDefault();
    setSearchResult(null);
    if (searchOrderId) {
      fetchOrderById(searchOrderId);
    }
  };

  // 주문 id로 주문 조회 (get) - path
  const fetchOrderById = async (orderId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      setSearchResult(response.data);
    } catch (e) {
      setOrderErrorMessage("존재하지 않는 주문 ID입니다.");
      console.log(e);
    }
    setLoading(false);
  };

  // 대기 중일 때 (아직 데이터를 받아오지 못한 경우)
  if (loading) {
    return <OrdersBlock>대기 중...</OrdersBlock>;
  }

  // 아직 orders 값이 설정되지 않았을 때
  if (!orders) {
    return null;
  }

  return (
    <OrdersBlock>
      <Title>Orders</Title>
      <Description>주문 조회 및 등록</Description>
      <hr />

      <section>
        <h3>주문 조회하기 (사용자 ID)</h3>
        <form onSubmit={handleSearch}>
          <input
            placeholder="사용자 ID"
            value={searchMemberId}
            onChange={handleSearchChange}
            required
          />
          <button type="submit">주문 조회하기</button>
        </form>
        {orders.length > 0 && <OrderList orders={orders} />}
        {memberErrorMessage && (
          <ErrorMessage>{memberErrorMessage}</ErrorMessage>
        )}
      </section>

      <section>
        <h3>주문 조회하기 (주문 ID)</h3>
        <form onSubmit={handleOrderSearch}>
          <input
            placeholder="주문 ID"
            value={searchOrderId}
            onChange={handleOrderSearchChange}
            required
          />
          <button type="submit">주문 조회하기</button>
        </form>
        {searchResult && <OrderDetail order={searchResult} />}
        {orderErrorMessage && <ErrorMessage>{orderErrorMessage}</ErrorMessage>}
      </section>

      <section>
        <h3>주문 등록하기</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="memberId"
            placeholder="사용자 ID"
            value={newOrder.memberId}
            onChange={handleChange}
            required
          />
          <input
            name="items.itemId"
            placeholder="상품 ID"
            value={newOrder.items[0].itemId}
            onChange={handleChange}
            required
          />
          <input
            name="items.orderQuantity"
            placeholder="수량"
            value={newOrder.items[0].orderQuantity}
            onChange={handleChange}
            type="number"
            required
          />
          <button type="submit">주문 등록하기</button>
        </form>
        {postErrorMessage && <ErrorMessage>{postErrorMessage}</ErrorMessage>}
      </section>
    </OrdersBlock>
  );
};

export default Orders;

const OrdersBlock = styled.div`
  width: 100vh;
  margin: 0 auto;
  height: 100vh;
  justify-content: center;

  section {
    margin-top: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
    margin-right: 1rem;
  }

  button {
    padding: 0.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 20px;
  }

  thead {
    font-size: 1.2rem;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 3rem;
  margin-top: 3rem;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 1.2rem;
  margin: 1.2rem 0;
  color: gray;
`;

const ErrorMessage = styled.p`
  color: #ff6060;
  margin-top: 10px;
  font-size: 14px;
`;
