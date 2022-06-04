//install mongoose, express, bcrypt, nanoid
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const {User, Bio, Explore} = require('./model')
const bcrypt = require('bcrypt')
const {nanoid} = require('nanoid')

app.use(express.json())

//connect ke cloud db mongodb
mongoose.connect('mongodb+srv://fauzansyawalino:Fauzan16!@clusterkukus.h1tj9.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

//test connection ke db
const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', ()=>{console.log("connection success")})

//register, akun dan biodata
app.post('/register', async (req,res)=>{
    const email = req.body.email
    const usern = req.body.usern
    const pass = req.body.pass
    const id = nanoid(6)

    const hash = await bcrypt.hash(pass,2)
    const example = new User({
        email:email,
        username:usern,
        password:hash,
        userid:id
    })

    await example.save()
    res.send('success')
})

//belum dipakai dan disesuaikan
app.post('/regbio', async (req,res)=>{
    const goal = req.body.goal
    const gender = req.body.gender
    const ttl = req.body.ttl
    const height = req.body.height
    const weight = req.body.weight
    const act = req.body.goal
    const speed = req.body.speed
    const pfp = req.files.Image.data.toString('base64')
    const id = nanoid(6)

    const example2 = new Bio({
        tujuan_ideal:goal,
        jenis_kelamin:gender,
        ttl:ttl,
        tinggi_badan:height,
        berat_badan:weight,
        tingkat_aktivitas:act,
        kecepatan_ideal:speed,
        profilepic: pfp,
        userid: id
    })

    await example2.save()
    res.send('success')
})

//login
app.post('/login', async (req,res)=>{
    const email = req.body.email
    const pass = req.body.pass
    const result = await User.find({email:`${email}`},{_id:0,__v:0,password:1,email:1})
    console.log(result)
    const ex = await bcrypt.compare(pass, result[0].password)
    console.log(ex)
    if(ex==true){
        res.send('login success')
        //res.redirect('/home') 
    }else{
        res.send('login fail')
    }
})

app.get('/profile/:userid', async (req,res)=>{
    const email = req.body.email
    const id = await User.find({email:`${email}`},{_id:0,__v:0,id:1})
    const pfp = await Bio.find({userid:`${id}`},{_id:0,__v:0,profilepic:1})
    res.send(`<img src="data:image/jpg;base64,${pfp}" />`)
})

app.get('/explore', async (req,res)=>{
    const result = await Explore.find({},{_id:0,__v:0})
    res.send(result)
})

app.get('/test', async (req,res)=>{
    const result = await User.find()
    res.send(result)
})


/*app.get('/hash', async (req,res)=>{
    const pass = req.body.pass
    const passhash = '$2b$04$X1TMYsDeKXIcou/CLz4wkOC6SeTsuXODtLyThrIjibjCwyvZ3mM/S'
    const ex = await bcrypt.compare(pass, passhash)
    const hash = await bcrypt.hash(pass,2)
    res.send(ex)
})*/

app.listen(8080, ()=>{
    console.log('connect at 8080')
})
