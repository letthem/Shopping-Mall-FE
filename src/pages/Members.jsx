import { useEffect, useState } from "react";
import styled from "styled-components";
import MemberList from "../components/members/MemberList";
import { axiosInstance } from "../api";

const Members = () => {
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newMember, setNewMember] = useState({
    memberName: "",
    address: {
      city: "",
      street: "",
      zipcode: "",
    },
  });
  const [searchMemberId, setSearchMemberId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 전체 사용자 리스트 조회 (get)
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/members");
      setMembers(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 사용자 등록 input handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setNewMember((prevMember) => ({
        ...prevMember,
        address: {
          ...prevMember.address,
          [key]: value,
        },
      }));
    } else {
      setNewMember({
        ...newMember,
        [name]: value,
      });
    }
  };

  // 사용자 등록 (post)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/members", newMember);
      setMembers([...members, response.data]);
      setNewMember({
        memberName: "",
        address: {
          city: "",
          street: "",
          zipcode: "",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchChange = (e) => {
    setSearchMemberId(e.target.value);
  };

  // 사용자 id로 사용자 조회 (get) - path
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSearchResult(null);
    try {
      const response = await axiosInstance.get(`members/${searchMemberId}`);
      setSearchResult(response.data);
    } catch (e) {
      setErrorMessage("존재하지 않는 사용자 ID입니다.");
      console.log(e);
    }
    setLoading(false);
  };

  // 대기 중일 때 (아직 데이터를 받아오지 못한 경우)
  if (loading) {
    return <MembersBlock>대기 중...</MembersBlock>;
  }

  // 아직 members 값이 설정되지 않았을 때
  if (!members) {
    return null;
  }

  return (
    <MembersBlock>
      <Title>Members</Title>
      <Description>사용자 등록과 조회</Description>
      <hr />

      <section>
        <h3>사용자 조회하기</h3>
        <form onSubmit={handleSearch}>
          <input
            placeholder="사용자 ID"
            value={searchMemberId}
            onChange={handleSearchChange}
            required
          />
          <button type="submit">사용자 조회하기</button>
        </form>
        {searchResult && (
          <table>
            <thead>
              <tr>
                <th>사용자 ID</th>
                <th>이름</th>
                <th>도시</th>
                <th>거리</th>
                <th>우편번호</th>
              </tr>
            </thead>
            <tbody>
              <MemberList member={searchResult} />
            </tbody>
          </table>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </section>
      <section>
        <h3>사용자 등록하기</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="memberName"
            placeholder="이름"
            value={newMember.memberName}
            onChange={handleChange}
            required
          />
          <input
            name="address.city"
            placeholder="도시"
            value={newMember.address.city}
            onChange={handleChange}
            required
          />
          <input
            name="address.street"
            placeholder="거리"
            value={newMember.address.street}
            onChange={handleChange}
            required
          />
          <input
            name="address.zipcode"
            placeholder="우편번호"
            value={newMember.address.zipcode}
            onChange={handleChange}
            type="number"
            required
          />
          <button type="submit">사용자 등록하기</button>
        </form>
      </section>

      <section>
        <h3>전체 사용자 리스트</h3>
        <table>
          <thead>
            <tr>
              <th>사용자 ID</th>
              <th>이름</th>
              <th>도시</th>
              <th>거리</th>
              <th>우편번호</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <MemberList key={member.id} member={member} />
            ))}
          </tbody>
        </table>
      </section>
    </MembersBlock>
  );
};

export default Members;

const MembersBlock = styled.div`
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
