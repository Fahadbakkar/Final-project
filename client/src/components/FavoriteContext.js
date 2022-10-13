import { useAuth0 } from "@auth0/auth0-react";

import { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext(null);

const FavoriteProvider = ({ children }) => {
  const { user } = useAuth0();

  const [favorites, setFavorites] = useState([]);
  const [load, setLoad] = useState(false);
  const [cat, setCat] = useState("All");
  useEffect(() => {
    if (user) {
      fetch(`/api/get-favorites/` + user.email + "/" + cat)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setFavorites(data.result);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, load]);

  return (
    <FavoriteContext.Provider
      value={{ favorites, user, setFavorites, load, setLoad }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteProvider;
