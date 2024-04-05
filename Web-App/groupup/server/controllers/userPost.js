import express from "express";

import User from "../models/userModel.js";

const router = express.Router();

export const createUser = async (req, res) => {
  console.log("ich bin in der CreateUser Funktions drin");
  //Diese Funktion wird nur genutzt wenn es den User nicht gibt. 
  // Sie wird nur einmal für jeden User benutzt
  const {Benutzername, Like, Dislike} = req.body;

  const newUser = new User({ Benutzername, Like, Dislike });

  console.log("Das sind die userDaten: " + req.body );
  // Definiere newUser um den abspeichern zu können.
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  res.json({ message: "User created successfully." });
};



export const findUser = async (req, res) => {
  console.log("Ich bin in der findUser Funktion beim User");
  console.log(req.params.id);

  try { 
    const UserFind = await User.findOne( {Benutzername: req.params.id} );
    res.status(200).json(UserFind);
    
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const userUpdate = async (req, res) => {
  console.log("Ich bin in der userUpdate Funktion drin");
  console.log(req.body);

  await User.findByIdAndUpdate( { _id: req.params.id } ,  req.body , { new: true });

  res.json(updatedPost);
};

export const userLike = async (req, res) => {
  console.log("Ich bin in der userLike Funktion drin");
  const { id } = req.params;

  const user =  await User.findById(id);

  const updatedUser = await User.findByIdAndUpdate(id, {Like: user.Like + 1 } , { new: true });

  res.json(updatedUser);
};

export const userDisLike = async (req, res) => {
  console.log("Ich bin in der userDisLike Funktion drin");
  
  const { id } = req.params;

  const user =  await User.findById(id);

  const updatedUser = await User.findByIdAndUpdate(id, {Dislike: user.Dislike + 1 } , { new: true });


  res.json(updatedUser);
};
export default router;
