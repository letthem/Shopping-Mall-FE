import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemList from "../components/items/ItemList";
import { axiosInstance } from "../api";

const Items = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/items");
      setItems(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 대기 중일 때 (아직 데이터를 받아오지 못한 경우)
  if (loading) {
    return <ItemsBlock>대기 중...</ItemsBlock>;
  }

  // 아직 articles 값이 설정되지 않았을 때
  if (!items) {
    return null;
  }

  return (
    <ItemsBlock>
      <Title>Items</Title>
      <Description>상품 등록과 조회, 재고 관리</Description>
      <hr />

      <section>
        <h3>상품 조회하기</h3>
        <input />
        <button>상품 조회하기</button>
      </section>

      <section>
        <h3>상품 등록하기</h3>
        <input />
        <input />
        <input />
        <button>상품 등록하기</button>
      </section>

      <section>
        <h3 style={{ marginBottom: "20px" }}>전체 상품 리스트</h3>
        <table>
          <thead>
            <tr style={{ borderBottom: "2px solid gray" }}>
              <th>상품 ID</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ItemList key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </section>
    </ItemsBlock>
  );
};

export default Items;

const ItemsBlock = styled.div`
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
    width: 40rem;
    text-align: center;
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
