import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
const FavCategory = ({ value, setValue }) => {
  const [check, setCheck] = useState("All");
  const { user } = useAuth0();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setCheck(e.target.value);

    setValue(e.target.value);
  };
  //fetch categories
  useEffect(() => {
    fetch("/api/favCat/" + user.email)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setLoading(true);
      });
  }, []);
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
        <p>Loading...</p>
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
export default FavCategory;
