import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";
import Hotels from "./Hotels";
import { useAuth0 } from "@auth0/auth0-react";
import HotelDetail from "./HotelDetail";
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
