import styled from "styled-components";
import { FaStar } from "react-icons/fa";
const FetchedRev = ({ reviews }) => {
  //to get stars and review
  return reviews.map((data) => {
    return (
      <Div>
        <h3>{data.name}</h3>
        {[...Array(Number(data.rating))].map((star, i) => {
          return (
            <>
              <Label>
                <Input type="radio" name="rating" value={data.rating} />

                <FaStar size={15} color={"#ffc107"} />
              </Label>
            </>
          );
        })}
        <P>{data.review}</P>
      </Div>
    );
  });
};
const Div = styled.div`
  border-bottom: 1px solid black;
  width: 50rem;
`;
const P = styled.p`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  width: 40rem;
`;
const Input = styled.input`
  display: none;
`;
const Label = styled.label``;
export default FetchedRev;
