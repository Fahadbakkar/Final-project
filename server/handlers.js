"use strict";
const { json } = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getHotels = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const ratings = req.params.badge;

  try {
    await client.connect();
    const db = client.db("Final-project");
    const hotels = await db
      .collection("Hotels")
      .find(ratings !== "All" ? { qualitativeBadgeText: ratings } : {})
      .toArray();

    if (hotels.length > 0) {
      res.status(200).json({
        status: 200,
        result: hotels,
        message: "hotels retrieved",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,

      message: "Hotels not found",
    });
    console.log(error);
  } finally {
    client.close();
  }
};

const getSpecificHotel = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params._id;

  try {
    await client.connect();
    const db = client.db("Final-project");
    const hotel = await db.collection("Hotels").findOne({ id: id });
    res.status(200).json({
      status: 200,
      data: hotel,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,

      message: "hotel not found",
    });
    console.log(error);
  } finally {
    client.close();
  }
};
const newUser = async (req, res) => {
  const newUser = req.body;
  const client = new MongoClient(MONGO_URI, options);
  console.log("newUser", newUser);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const checkForUser = await db.collection("users").findOne(newUser.email);
    if (newUser.email) {
      res.status(200).json({
        status: 200,
        data: req.body,
        message: "user exist",
      });
    } else {
      const data = await db.collection("users").insertOne(newUser);
      res.status(200).json({
        status: 200,
        data: newUser,
        message: "New user added",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding new user",
    });
    console.log(error);
  } finally {
    client.close();
  }
};
const addToFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { image, name, address, userEmail, id, category } = req.body;

  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = await db
      .collection("users")
      .updateOne(
        { email: userEmail },
        { $push: { favorites: { image, id, name, address, category } } }
      );
    res.status(200).json({
      status: 200,
      message: "Successfully added",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding to cart",
    });
  } finally {
    client.close();
  }
};
const removeFromFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { name, userEmail, id } = req.body;

  try {
    await client.connect();
    const db = client.db("Final-project");
    const findhotel = await db
      .collection("users")
      .updateOne({ email: userEmail }, { $pull: { favorites: { id: id } } });
    res.status(200).json({
      status: 200,
      message: "Successfully removed",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error removing from favorites",
    });
  } finally {
    client.close();
  }
};
const getFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.userEmail;
  const category = req.params.category;

  try {
    await client.connect();
    const db = client.db("Final-project");

    const data = await db.collection("users").findOne({
      email: userEmail,
    });

    const sortedArray = data.favorites.filter(
      (favorite) => favorite.category === category
    );
    res.status(200).json({
      status: 200,
      result: category !== "All" ? sortedArray : data.favorites,
      message: "Favorites found",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,

      message: "Favorites not found",
    });
    console.log(error);
  } finally {
    client.close();
  }
};
const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = (
      await db
        .collection("Hotels")
        .find()
        .project({ qualitativeBadgeText: 1 })
        .toArray()
    ).map((category) => category.qualitativeBadgeText);

    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved categories",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "categories not found" });
  } finally {
    client.close();
  }
};
const getPOI = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("POI").find().toArray();
    res.status(200).json({
      status: 200,
      data: result,
      message: "POI achieved",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getRestos = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const price = req.params.price;
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = await db
      .collection("resto")
      .find(price !== "All" ? { price_level: price } : {})
      .toArray();
    res.status(200).json({
      status: 200,
      data: result,
      message: "received restos",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "restos not found" });
  } finally {
    client.close();
  }
};

const getSpecificResto = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params._id;
  console.log(req.params._id);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const resto = await db.collection("resto").findOne({ _id: _id });
    res.status(200).json({
      status: 200,
      data: resto,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,

      message: "resto not found",
    });
    console.log(error);
  } finally {
    client.close();
  }
};
// get categories for restos
const getCatResto = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = (
      await db.collection("resto").find().project({ price_level: 1 }).toArray()
    ).map((category) => category.price_level);
    console.log(result);
    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved categories",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
//get categories for favorites
const getFavCat = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = (
      await db.collection("users").findOne({ email: email })
    ).favorites.map((favorite) => favorite.category);

    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved categories",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const postReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { name, review, rating } = req.body;

  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = await db
      .collection("reviews")
      .insertOne({ name: name, review: review, rating: rating });

    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully posted reviews",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "error posting review" });
  } finally {
    client.close();
  }
};
const getReviews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final-project");
    const result = await db.collection("reviews").find().toArray();

    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved reviews",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "couldnt retrieve reviews" });
  } finally {
    client.close();
  }
};

module.exports = {
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
  postReview,
  getReviews,
};
