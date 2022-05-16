//make sure to install express and firestore
const { Firestore } = require('@google-cloud/firestore')
const express = require('express')
const app = express()

app.use(express.json())

const firestore = new Firestore({
    projectId: '',
    keyFileName: ''
})

const db = firestore.collection('')

app.post('/post', async (req,res)=>{
    const nama = req.body.nama

    await db.doc(`${nama}`).set({
        name: nama
    })
    res.send('success')
})

app.get('/',async (req,res)=>{
    const result = await db.get() 
    res.send(result.docs.map(doc => doc.data()))
})

app.listen(8080,()=>{
    console.log('Connected on port 8080')
})