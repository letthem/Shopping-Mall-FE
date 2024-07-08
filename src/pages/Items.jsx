import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemList from "../components/items/ItemList";
import { axiosInstance } from "../api";

const Items = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: "",
    itemPrice: "",
    stockQuantity: "",
  });
  const [updateItem, setUpdateItem] = useState({
    itemId: "",
    itemName: "",
    itemPrice: "",
    stockQuantity: "",
  });
  const [searchItemId, setSearchItemId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [patchErrorMessage, setPatchErrorMessage] = useState("");

  // 전체 상품 리스트 조회 (get)
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

  // 상품 등록 input handle
  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  // 상품 등록 (post)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/items", newItem);
      setItems([...items, response.data]);
      setNewItem({ itemName: "", itemPrice: "", stockQuantity: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchChange = (e) => {
    setSearchItemId(e.target.value);
  };

  // 상품 id로 상품 조회 (get) - path
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSearchResult(null);
    try {
      const response = await axiosInstance.get(`/items/${searchItemId}`);
      setSearchResult(response.data);
    } catch (e) {
      setErrorMessage("존재하지 않는 상품 ID입니다.");
      console.log(e);
    }
    setLoading(false);
  };

  // 상품 수정 input handle
  const handleUpdateChange = (e) => {
    setUpdateItem({
      ...updateItem,
      [e.target.name]: e.target.value,
    });
  };

  // 상품 수정 (patch)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setPatchErrorMessage("");
    try {
      const response = await axiosInstance.patch(
        `/items/${updateItem.itemId}`,
        updateItem
      );
      setItems(
        items.map((item) =>
          item.id === response.data.id ? response.data : item
        )
      );
      setUpdateItem({
        itemId: "",
        itemName: "",
        itemPrice: "",
        stockQuantity: "",
      });
    } catch (e) {
      setPatchErrorMessage("존재하지 않는 상품 ID입니다.");
      console.log(e);
    }
  };

  // 상품 삭제 (delete)
  const handleDelete = async (itemId) => {
    try {
      alert("해당 item이 삭제됩니다.");
      await axiosInstance.delete(`/items/${itemId}`);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (e) {
      console.log(e);
    }
  };

  // 대기 중일 때 (아직 데이터를 받아오지 못한 경우)
  if (loading) {
    return <ItemsBlock>대기 중...</ItemsBlock>;
  }

  // 아직 items 값이 설정되지 않았을 때
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
        <form onSubmit={handleSearch}>
          <input
            placeholder="상품 ID"
            value={searchItemId}
            onChange={handleSearchChange}
            required
          />
          <button type="submit">상품 조회하기</button>
        </form>
        {searchResult && (
          <table>
            <thead>
              <tr>
                <th>상품 ID</th>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              <ItemList item={searchResult} onDelete={handleDelete} />
            </tbody>
          </table>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </section>

      <section>
        <h3>상품 등록하기</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="itemName"
            placeholder="상품명"
            value={newItem.itemName}
            onChange={handleChange}
            required
          />
          <input
            name="itemPrice"
            placeholder="가격"
            value={newItem.itemPrice}
            onChange={handleChange}
            type="number"
            required
          />
          <input
            name="stockQuantity"
            placeholder="수량"
            value={newItem.stockQuantity}
            onChange={handleChange}
            type="number"
            required
          />
          <button type="submit">상품 등록하기</button>
        </form>
      </section>

      <section>
        <h3>상품 수정하기</h3>
        <form onSubmit={handleUpdate}>
          <input
            name="itemId"
            placeholder="상품 ID"
            value={updateItem.itemId}
            onChange={handleUpdateChange}
            required
          />
          <input
            name="itemName"
            placeholder="상품명"
            value={updateItem.itemName}
            onChange={handleUpdateChange}
            required
          />
          <input
            name="itemPrice"
            placeholder="가격"
            value={updateItem.itemPrice}
            onChange={handleUpdateChange}
            type="number"
            required
          />
          <input
            name="stockQuantity"
            placeholder="수량"
            value={updateItem.stockQuantity}
            onChange={handleUpdateChange}
            type="number"
            required
          />
          <button type="submit">상품 수정하기</button>
        </form>
        {patchErrorMessage && <ErrorMessage>{patchErrorMessage}</ErrorMessage>}
      </section>

      <section>
        <h3>전체 상품 리스트</h3>
        <table>
          <thead>
            <tr>
              <th>상품 ID</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ItemList key={item.id} item={item} onDelete={handleDelete} />
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
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 20px;
  }

  th {
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f4f4f4;
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
