import { useEffect, useState } from "react";
import styled from "styled-components";
import POImap from "./POImap";
const POI = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //to fetch points of interest
  useEffect(() => {
    fetch("/api/get-POI")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(true);
      });
  }, []);
  return (
    <Wrapper>
      {data.map((poi) => {
        return (
          <Div>
            <POIdiv>
              <Img src={poi.image} />
              <Map>
                <Info>
                  <H1>{poi.name}</H1>
                  <P>{poi.description}</P>
                  <a href={poi.url}>{poi.url}</a>
                </Info>
                {/* <POImap lat={poi.lat} lng={poi.lng} /> */}
              </Map>
            </POIdiv>
            <Copy>{poi.copy}</Copy>
          </Div>
        );
      })}
    </Wrapper>
  );
};
const Map = styled.div`
  display: flex;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const Copy = styled.p``;
const P = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Passion+One:wght@700&display=swap");
  font-family: "Passion One", cursive;
  font-size: 18px;
  margin-right: 30%;
`;
const H1 = styled.h1``;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const POIdiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3%;
  // margin-right: 20%;
  // margin-left: 9%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 4%;
  margin-right: 10%;
`;
const Img = styled.img`
  max-height: 200px;
`;
export default POI;
