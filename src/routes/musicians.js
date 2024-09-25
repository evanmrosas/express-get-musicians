const express = require("express")
const router = express.Router()
const {Musician} = require("../../models/index")
const db = require("../../db/connection");

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
// GET all
router.get("/", async (req, res) => {
    const musicians = await Musician.findAll()
    res.json(musicians)
})
// GET one
router.get("/:id", async(req, res) => {
    const id = req.params.id
    const musician = await Musician.findByPk(id)
    res.json(musician)
})
// CREATE one
router.post("/", async (req, res) => {
    const newMusician = await Musician.create(req.body)
    res.json(newMusician)
})
// UPDATE one
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const updateMusician = await Musician.findByPk(id)
    await updateMusician.update(req.body)
    res.json(updateMusician)
})
// DELETE one
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleteMusician = await Musician.findByPk(id)
    await deleteMusician.destroy()
    res.status(200).json({message: "musician deleted"})
})
module.exports = router;