const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;
const request = require("request");
//handlers
const {
  getHotels,
  getSpecificHotel,
  newUser,
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  getCategories,
  getPOI,
  getRestos,
  getSpecificResto,
  getCatResto,
  getFavCat,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  //
  // endpoints
  .get("/api/get-hotels/:badge", getHotels)
  .get("/api/hotels/hotelDetails/:_id", getSpecificHotel)
  .post("/api/new-user", newUser)
  .post("/api/add-to-favorites", addToFavorites)
  .get("/api/get-favorites/:userEmail/:category", getFavorites)
  .patch("/api/remove-from-favorites", removeFromFavorites)
  .get("/api/categories", getCategories)
  .get("/api/get-POI", getPOI)
  .get("/api/get-restos/:price", getRestos)
  .get("/api/restaurants/restaurantDetails/:_id", getSpecificResto)
  .get("/api/restoCat", getCatResto)
  .get("/api/favCat/:userEmail", getFavCat)
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
