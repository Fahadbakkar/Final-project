const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;

//handlers
const {
  getHotels,
  getSpecificHotel,
  newUser,
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  getCategories,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  //
  // endpoints
  .get("/api/get-hotels/:badge", getHotels)
  .get("/api/hotels/hotelDetails/:id", getSpecificHotel)
  .post("/api/new-user", newUser)
  .post("/api/add-to-favorites", addToFavorites)
  .get("/api/get-favorites/:userEmail", getFavorites)
  .patch("/api/remove-from-favorites", removeFromFavorites)
  .get("/api/categories", getCategories)
  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
