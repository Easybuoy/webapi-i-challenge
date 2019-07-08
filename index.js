// implement your API here
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const User = require("./data/db");

/**
 * METHOD: GET
 * ROUTE: /api/users/
 * PURPOSE: Get all Users.
 */
app.get("/api/users", (req, res) => {
  User.find()
    .then(data =>
      res.json({
        status: "success",
        message: "Users gotten successfully",
        data
      })
    )
    .catch(err =>
      res
        .status(500)
        .json({ status: "error", message: "Error fetching users", err })
    );
});

/**
 * METHOD: POST
 * ROUTE: /api/users/
 * PURPOSE: Create a new User.
 */
app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  const payload = {
    name,
    bio
  };

  if (!name || !bio) {
    return res
      .status(400)
      .json({ status: "error", message: "Name and Bio fields are required" });
  }

  User.insert(payload)
    .then(data => {
      payload.id = data.id;
      res.json({
        status: "success",
        message: "User created successfully",
        payload
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ status: "error", message: "Error creating user", err })
    );
});

/**
 * METHOD: GET
 * ROUTE: /api/users/:id
 * PURPOSE: Get a User by id.
 */
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(data =>
      res.json({
        status: "success",
        message: "User gotten successfully",
        data
      })
    )
    .catch(err =>
      res
        .status(500)
        .json({ status: "error", message: "Error fetching users", err })
    );
});

/**
 * METHOD: PUT
 * ROUTE: /api/users/:id
 * PURPOSE: Update a User.
 */
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const payload = {
    name,
    bio
  };

  User.update(id, payload)
    .then(data => {
      payload.id = data.id;
      res.json({
        status: "success",
        message: "User updated successfully",
        payload
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ status: "error", message: "Error updating user", err })
    );
});

/**
 * METHOD: DELETE
 * ROUTE: /api/users/:id
 * PURPOSE: Delete a User.
 */
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  User.remove(id)
    .then(data => {
      res.json({
        status: "success",
        message: "User deleted successfully"
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ status: "error", message: "Error deleting user", err })
    );
});

app.listen(3000, () => console.log("app started"));
