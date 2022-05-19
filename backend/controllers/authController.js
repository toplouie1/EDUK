const express = require("express");
const db = require("../db/dbConfig.js");
const auth = express.Router();
const { createUser } = require("../queries/users.js");
const { authUser } = require("../queries/auth.js")

//create a auth
auth.post("/sign_up", async (req, res) => {
    const user = req.body;
    const createdUser = await createUser(user);
    if (createdUser.uid) {
      res.json({ success: true, result: createdUser });
    } else
      res.status(500).json({ success: false, error: createdUser });
  });

//Login a exsiting user
auth.post("/login", async (req, res) => {
    const { user_name, password } = req.body;
    const id = await authUser(user_name, password);
  
    if(id.uid) {
        res.json({ success: true, result: id.uid });
    } else
        res.status(500).json({ success: false, error: "incorrect user_name or password" });
  });

  module.exports = auth;