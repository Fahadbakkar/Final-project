import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";
import Hotels from "./Hotels";
import { useAuth0 } from "@auth0/auth0-react";
import HotelDetail from "./HotelDetail";
import Favorites from "./Favorites";
import AboutUs from "./AboutUs";
import POI from "./POI";
import Restos from "./Restos";
import RestoDetail from "./RestoDetail";
import Reviews from "./Reviews";
const App = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/hoteldetails/:name" element={<HotelDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/points-of-interests" element={<POI />} />
        <Route path="/restaurants" element={<Restos />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route
          path="/restaurants/restaurantsdetails/:_id"
          element={<RestoDetail />}
        />
        <Route path="" element={<h1>Error! Code: 231543223</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
