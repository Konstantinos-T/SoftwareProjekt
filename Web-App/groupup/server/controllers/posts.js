import express from "express";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
    console.log("Ich bin in der getPosts Funktion");
    try {
      const postMessages = await PostMessage.find();
      console.log("Test");
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const getPost = async (req, res) => {
  const { id } = req.params;

  console.log("Ich bin in der getPost Funktion");
  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const findPost = async (req, res) => {
    console.log("Ich bin in der findPost Funktion");
    console.log(req.query);
    
  try {  
      const postMessages = await PostMessage.find({ ...req.query }).sort( {"Preis": -1 }).limit(20);
    
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log("Ich bin in der updatePost Funktion drin");
  console.log(req.body);

  await PostMessage.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  console.log("Ich bin in der delete Funktion drin");
  console.log(req.params);

  const { id } = req.params; 

  await PostMessage.findOneAndRemove(id);
  console.log("Gelöscht"+ res);
  res.json({ message: "Fahrt erfolgreich gelöscht." });
};

export const createPost = async (req, res) => {
  
  console.log("ich bin in der createPost funktion");
  
  const {
    Fahrer,
    Start,
    Ziel,
    Datum,
    Abfahrt,
    Ankunft,
    Preis,
    Sitze,
    Umwege,
    MaennlicheMitfahrer,
    WeiblicheMitfahrer,
    Rauchen,
    Tierauto,
    createdAt,
    Mitfahrer,
	  MitfahrAnfragender,
    MitfahrerAbgelent,
    BelegteSitze,
    UserLike,
    StartLongitude,
    StartLatitude
  } = req.body;


  const newPostMessage = new PostMessage({
    Fahrer,
    Start,
    Ziel,
    Datum,
    Abfahrt,
    Ankunft,
    Preis,
    Sitze,
    Umwege,
    MaennlicheMitfahrer,
    WeiblicheMitfahrer,
    Rauchen,
    Tierauto,
    createdAt,
    Mitfahrer,
	  MitfahrAnfragender,
    MitfahrerAbgelent,
    BelegteSitze,
    UserLike,
    StartLongitude,
    StartLatitude
  });

  console.log(newPostMessage);
  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const acceptUser = async (req, res) => {
    console.log("Ich bin in der acceptUser Funktion drin");

    const { id } = req.params;
    const {  Mitfahrer, MitfahrerAbgelent } = req.body;
    const updatedPost = { Mitfahrer, MitfahrerAbgelent };

    await PostMessage.findByIdAndUpdate(id, { $push: updatedPost } , { new: true });
    /* await PostMessage.findByIdAndUpdate(id, { $addToSet: updatedPost } , { new: true }); */
  
    res.json(updatedPost);
  };

export const fahrtBuchen = async (req, res) => {
  console.log("Ich bin in der fahrtBuchen Funktion drin");

  const { id } = req.params;
  const { MitfahrAnfragender } = req.body;
  const updatedPost = { MitfahrAnfragender };

  await PostMessage.findByIdAndUpdate(id, { $addToSet: updatedPost } , { new: true });

  res.json(updatedPost);
};
export const addSitz = async (req, res) => {
  console.log("Ich bin in der addSitz Funktion drin");

  const { id } = req.params;

  const post =  await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { BelegteSitze: post.BelegteSitze + 1 }, { new: true });
  
  res.json(updatedPost);

};


  export const remPending = async (req, res) => {
    
    console.log("Ich bin in der remPending Funktion drin");
    console.log(req.params);
    console.log(req.body);

    const { id } = req.params;
    const { MitfahrAnfragender, Mitfahrer } = req.body;
    const updatedPost =  { MitfahrAnfragender , Mitfahrer};
    await PostMessage.findByIdAndUpdate( id,  { $pull:  updatedPost  }, { new: true });

    res.json(updatedPost);
  };

  export const findeEigeneFahrt = async (req, res) => {
    console.log("Ich bin in der findeEigeneFahrt Funktion beim User");
    console.log(req.params.id);
  
    try { 
      const newUser = await PostMessage.find( {Fahrer: req.params.id}  );
      console.log(newUser);
      res.status(200).json(newUser);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  };

  export const findeEigeneMitfahrt = async (req, res) => {
    console.log("Ich bin in der findeEigeneMitfahrt Funktion beim User");
    console.log(req.params.id);
  
    try { 
      const PostMessages = await PostMessage.find( {Mitfahrer: req.params.id} );
      console.log(PostMessages);
      res.status(200).json(PostMessages);

      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  };

  export const findeEigeneAnfrage = async (req, res) => {
    console.log("Ich bin in der findeEigeneAnfrage Funktion beim User");
    console.log(req.params.id);

    try { 
      const newUser = await PostMessage.find( { MitfahrAnfragender: req.params.id } );
      console.log(newUser);
      res.status(200).json(newUser);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  };

export default router;