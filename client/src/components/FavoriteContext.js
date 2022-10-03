import { useAuth0 } from "@auth0/auth0-react";

import { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext(null);

const FavoriteProvider = ({ children }) => {
  const { user } = useAuth0();
  const [favorites, setFavorites] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(`/api/new-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        favorites: [],
      })
        .then(() => {
          setLoad(true);
        })
        .catch((error) => {
          console.error("error", error);
        }),
    });
  }, [user]);

  //   useEffect(() => {
  //     if (user) {
  //       fetch(`/api/get-favorites/` + user.email)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.result) {
  //             setFavorites(data.result.favorite);
  //             setLoad(true);
  //           } else {
  //             userHandle();
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }, [user]);

  //   const userHandle = () => {
  //     fetch("/api/new-user", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...user,
  //         favorites: [],
  //       })
  //         .then(() => {
  //           setLoad(true);
  //         })
  //         .catch((error) => {
  //           console.error("error", error);
  //         }),
  //     });
  //   };

  return (
    <FavoriteContext.Provider value={{ favorites, user, setFavorites, load }}>
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteProvider;
