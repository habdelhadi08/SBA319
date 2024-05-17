import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();
// ======= Airport document minimum requirements ====== //
/**
 * {
 *  "name": "name",
 *  "location": "location",
 *  "companies": ["companies"]
 * } 

  
  /**
   * POST /airports/
   */
  router.post("/", async(req,res)=>{
    const collection = await db.collection("airports");
    const newAirport = req.body;
    const result = await collection.insertOne(newAirport);
    res.send(result).status(204);
    
    })
  
    // get all airports
    router.get("/all", async (req, res) => {
      const collection = await db.collection("airports");
      const airports = await collection.find({}).toArray();
      res.status(200).json(airports);
        });
  /**
   * GET airport/:id
   */
  router.get("/:id", async (req, res) => {
    const collection = await db.collection("airports");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
  
    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
  });
  //Update companies
  router.put("/:id/", async(req,res)=>{
    let collection= await db.collection("airports");
    let query= {_id:new ObjectId(req.params.id)};
    let result= await collection.updateOne(query, {$set: {companies: req.body.companies}
    });
  if(!result) res.send("Not found"). status(404);
  else res.send(result).status(200)
  })
  //delete single airport entry entry
  router.delete("/:id", async(req,res)=>{
      let collection= await db.collection("airports");
      let query= {_id:new ObjectId(req.params.id)};
      let result= await collection.deleteOne(query);
  if(!result) res.send("Not found"). status(404);
  else res.send(result).status(200)    
  })


export default router;