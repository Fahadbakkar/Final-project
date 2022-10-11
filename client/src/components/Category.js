import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
const Category = ({ value, setValue }) => {
  const [check, setCheck] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // to set the state to what was chosen
  const handleChange = (e) => {
    setCheck(e.target.value);

    setValue(e.target.value);
  };
  //fetching category
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setLoading(true);
      });
  }, []);
  //remove duplicates
  let noDuplicates = [...new Set(items)];
  noDuplicates.push("All");

  return (
    <>
      {loading ? (
        <RadioDiv>
          <Choose>Choose a rating!</Choose>
          {noDuplicates.length > 0 &&
            noDuplicates.map((rat) => {
              return (
                <Label>
                  {rat}
                  <input
                    type="radio"
                    name="check"
                    value={rat.toString()}
                    checked={check === rat.toString()}
                    onChange={handleChange}
                  />{" "}
                </Label>
              );
            })}
        </RadioDiv>
      ) : (
        <Loader />
      )}
    </>
  );
};
const Choose = styled.label`
  border-bottom: 1px solid black;
`;
const Label = styled.label`
  margin-top: 5px;
  font-weight: bold;
`;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  align-items: center;
`;
export default Category;
