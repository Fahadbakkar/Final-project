import { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
const RestoCategory = ({ value, setValue }) => {
  const [check, setCheck] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setCheck(e.target.value);

    setValue(e.target.value);
  };
  useEffect(() => {
    fetch("/api/restoCat")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setLoading(true);
      });
  }, [value]);

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
export default RestoCategory;
