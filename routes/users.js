import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// ======= User document minimum requirements ====== //
/**
 * {
 *  "email": "test@test.com",
 *  "password": "password123",
 *  "username": "testuser1"
 * } 
 */

// ============== CRUD ====================== //
/**
 * GET user/
 */
router.get("/", (req, res) => {
  console.log(req.query);

  if (req.query.name) {
      res.send(`Hello ${req.query.name}`);
  } else {
      res.send("Hello from Grades router");
  }
  
});
/**
 * Create a new user
 * POST /users/
 */
router.post("/", async(req,res)=>{
const collection = await db.collection("users");
const newUser = req.body;
const result = await collection.insertOne(newUser);
res.send(result).status(204);

})




/**
 * Get all users
 * GET /users/
 */
router.get("/all", async (req, res) => {
const collection = await db.collection("users");
const users = await collection.find({}).toArray();
res.status(200).json(users);
  });




/**
 * Get a single user by the id
 * GET /users/:id
 */
router.get("/:id", async (req, res) => {
  const collection = await db.collection("users");
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});




/**
 * Update an user by the id
 * PUT /users/:id 

*/
router.put("/:id/", async(req,res)=>{
  let collection= await db.collection("users");
  let query= {_id:new ObjectId(req.params.id)};
  let result= await collection.updateOne(query, {$set: {username: req.body.username}
  });
if(!result) res.send("Not found"). status(404);
else res.send(result).status(200)
})




/**
 * Delete an user by the id
 * DELETE /users/:id
 */
router.delete("/:id", async(req,res)=>{
  let collection= await db.collection("users");
  let query= {_id:(req.params.id)};
  let result= await collection.deleteOne(query);
if(!result) res.send("Not found"). status(404);
else res.send(result).status(200)    
})





export default router;