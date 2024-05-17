import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();
// ======= User document minimum requirements ====== //
/**
 * {
 *  "name": "name",
 *  "passenger": "passengerno.",
 *  "manufacturer": "plane`s manufacture"
 * } 
 */
  
  /**
   * POST /airlines/
   */
  router.post("/", async(req,res)=>{
    const collection = await db.collection("airlines");
    const newAirline = req.body;
    const result = await collection.insertOne(newAirline);
    res.send(result).status(204);
    
    })

  // get all airlines
  router.get("/all", async (req, res) => {
    const collection = await db.collection("airlines");
    const airlines = await collection.find({}).toArray();
    res.status(200).json(airlines);
      });
  
  
  /**
   * GET airline/:id
   */
  router.get("/:id", async (req, res) => {
    const collection = await db.collection("airlines");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
  
    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
  });
/**
 * Update a passenger by the id
 * PUT /airlines/:id 

*/
router.put("/:id/", async(req,res)=>{
  let collection= await db.collection("airlines");
  let query= {_id:new ObjectId(req.params.id)};
  let result= await collection.updateOne(query, {$set: {passenger: req.body.passenger}
  });
if(!result) res.send("Not found"). status(404);
else res.send(result).status(200)
})
  //delete a single airline entry
  router.delete("/:id", async(req,res)=>{
      let collection= await db.collection("airlines");
      let query= {_id:new ObjectId(req.params.id)};
      let result= await collection.deleteOne(query);
  if(!result) res.send("Not found"). status(404);
  else res.send(result).status(200)    
  })
  /**
   * GET /grades/student/:id
   * Redirect to /grades/learner/:id
   */
 
  export default router;














