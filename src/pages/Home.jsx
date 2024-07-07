import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeBlock>
      <div className="title">Shopping Mall</div>
      <BoxBlock>
        <BoxItem>
          <StyledLink to="/items">
            <img />
            <h4>Items</h4>
            <p>상품 등록과 조회, 재고 관리 등</p>
          </StyledLink>
        </BoxItem>
        <BoxItem>
          <StyledLink to="/members">
            <img />
            <h4>Members</h4>
            <p>사용자 등록과 조회</p>
          </StyledLink>
        </BoxItem>
        <BoxItem>
          <StyledLink to="/orders">
            <img />
            <h4>Orders</h4>
            <p>주문 등록과 조회</p>
          </StyledLink>
        </BoxItem>
      </BoxBlock>
    </HomeBlock>
  );
};

export default Home;

const HomeBlock = styled.div`
  width: 100vh;
  margin: 0 auto;
  height: 100vh;

  .title {
    background-color: #424242;
    color: white;
    text-align: center;
    margin-top: 8rem;
    padding: 0.7rem;
    font-size: 2rem;
    font-weight: 500;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const BoxBlock = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
`;

const BoxItem = styled.div`
  width: 16rem;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 3rem;

  &:hover {
    background-color: #eeeeee;
  }
  
  h4 {
    font-size: 2rem;
    font-weight: 400;
    padding-bottom: 1rem;
  }

  & + & {
    margin-left: 2rem;
  }
`;
