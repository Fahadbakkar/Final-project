import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./components/App";
import FavoriteProvider from "./components/FavoriteContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-t47hswxr.us.auth0.com"
      clientId="pgHCnBJBc4lWJMKtwloI1cFOWLezfWuD"
      redirectUri={window.location.origin}
    >
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </Auth0Provider>
  </React.StrictMode>
);
