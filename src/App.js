import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { desktop, laptop, tablet, mobile } from "./config/breakpoint";

const Header = styled.div`
  background: #faf9f4;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-weight: bold;
  color: #4e3a3b;
  font-size: 2rem;
`;

const Content = styled.div`
  ${desktop} {
    padding: 20px 15%;
  }

  ${tablet} {
    padding: 20px 5%;
  }
  ${laptop} {
    padding: 20px 15%;
  }

  ${mobile} {
    padding: 20px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  gap: 5px;

  .label {
    font-weight: bold;
  }

  select {
    width: max-content;
    min-width: 200px;
    padding: 10px 5px;
    border: 1px solid #ccc;
  }
`;

const DisplayUsers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  border-top: solid 1px #ccc;
  gap: 20px;
  padding: 20px 0;

  ${tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const UserCards = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  gap: 20px;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
`;

const UserData = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-weight: bold;
    font-size: 1.2rem;
    padding-bottom: 10px;
    text-transform: uppercase;
  }
`;

const UserDataRow = styled.div`
  display: flex;
  gap: 5px;

  .label {
    text-transform: capitalize;
  }
  .data {
    font-weight: bold;
  }
`;

const App = () => {
  const [data, setData] = useState([]);
  const [age, setAge] = useState(0);

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const ageGroup = [
    { id: 0, data: "All" },
    { id: 1, data: "20 and below" },
    { id: 2, data: "21 to 39" },
    { id: 3, data: "40 and above" },
  ];

  useEffect(() => {
    fetch("http://www.mocky.io/v2/5d73bf3d3300003733081869")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const contentRowRenderer = (title, field) => {
    const checkIfTtemInFieldIsNull = (item, last) => {
      if (item) {
        return item + (last === "last" ? ", " : "");
      } else {
        return "";
      }
    };

    switch (title) {
      case "address":
        return (
          <UserDataRow>
            <div className="label">{title}:</div>
            <div className="data">
              {checkIfTtemInFieldIsNull(field.suite)}
              {checkIfTtemInFieldIsNull(field.street)}
              {checkIfTtemInFieldIsNull(field.zipcode)}
              {checkIfTtemInFieldIsNull(field.city, "last")}
            </div>
          </UserDataRow>
        );
      default:
        return (
          <UserDataRow>
            <div className="label">{title}:</div>
            <div className="data">{field}</div>
          </UserDataRow>
        );
    }
  };

  const checkIfTheFieldIsEmpty = (title, field) => {
    if (field) {
      return contentRowRenderer(title, field);
    } else {
      return null;
    }
  };
  return (
    <>
      <Header>District Manager</Header>
      <Content>
        <FilterContainer>
          <div className="label">Filter by Age</div>
          <select value={age} onChange={handleAgeChange}>
            <option default disabled value="">
              Select age
            </option>
            {ageGroup.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.data}
                </option>
              );
            })}
          </select>
        </FilterContainer>
        <DisplayUsers>
          {data
            .filter((item) => {
              if (age == 0) {
                return item;
              } else if (age == 1) {
                return item.age <= 20;
              } else if (age == 2) {
                return item.age >= 21 && item.age <= 39;
              } else if (age == 3) {
                return item.age >= 40;
              } else {
                return item;
              }
            })

            //sort by age
            .sort((a, b) => {
              return a.age - b.age;
            })
            .map((item) => {
              return (
                <UserCards key={item.name + "-usercard"}>
                  <div>
                    <UserAvatar
                      src={
                        process.env.PUBLIC_URL +
                        "assets/images/userphoto-prime1.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <UserData>
                    <div className="name">{item.name}</div>
                    {checkIfTheFieldIsEmpty("email", item.email)}
                    {checkIfTheFieldIsEmpty("mobile", item.phone)}
                    {checkIfTheFieldIsEmpty("company", item.company)}
                    {checkIfTheFieldIsEmpty("address", item.address)}
                    {checkIfTheFieldIsEmpty("website", item.website)}
                    {checkIfTheFieldIsEmpty("age", item.age)}
                  </UserData>
                </UserCards>
              );
            })}
        </DisplayUsers>
      </Content>
    </>
  );
};

export default App;
