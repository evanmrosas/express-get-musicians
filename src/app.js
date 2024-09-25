const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//TODO: Create a GET /musicians route to return all musicians 
app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll()
    res.json(musicians)
})
app.get("/musicians/:id", async (req, res) => {
    const id = req.params.id
    const musician = await Musician.findByPk(id)
    res.json(musician)
})
app.post("/musicians", async (req, res) => {
    const newMusician = await Musician.create(req.body)
    res.json(newMusician)
})
app.put("/musicians/:id", async (req, res) => {
    const id = req.params.id
    const updateMusician = await Musician.findByPk(id)
    await updateMusician.update(req.body)
    res.json(updateMusician)
})
app.delete("/musicians/:id", async (req, res) => {
    const id = req.params.id
    const deleteMusician = await Musician.findByPk(id)
    await deleteMusician.destroy()
})



module.exports = app;