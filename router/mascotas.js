const express = require("express");
const Mascota = require("../models/mascota");
const router = express.Router()
const mascotaSchema = require('../models/mascota')

router.get("/", async(req, res)=>{
    try {
    const arrayMascotasdb = await mascotaSchema.find();
    console.log(arrayMascotasdb);
    // res.json(arrayMascotasdb)
    res.render("mascotas",{
     arrayMascotas:   arrayMascotasdb
    })
    } catch (error) {
        console.log(error);
    }
})
router.get('/crear',(req,res)=>{
    res.render('crear')
})

router.post('/', async (req,res)=>{
    const {body}= req;
    console.log(body);
    try {
        const mascotadb= new Mascota(body)
        await mascotadb.save()
        res.redirect('/mascotas')
    } catch (error) {
        console.log(error);
    }
})
module.exports= router;
