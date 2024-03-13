const express = require("express")
const app = express()
const cors= require("cors")
app.use(cors())
app.use(express.json())
const {MongoClient} = require("mongodb")

const client = new MongoClient("mongodb://127.0.0.1:27017")

app.get("/",(req,res)=>{
    res.send("hahahahaha")
})

app.post("/AddAttendance",async(req,res)=>{
    const data = req.body
    await client.connect()
    const dbName= "edoti"
    const collectionName= "attendance"
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    for(let i of data){
        const dateAttendance = await collection.find({
            rollnum:i.rollnum,
            date:i.date
        }).toArray()
        if(dateAttendance.length===0){
            await collection.insertOne(i)
        }
        else{
            await collection.updateOne(
                {
                  rollnum: i.rollnum,
                  date: i.date
                },
                {
                  $set: {
                    attendance: i.attendance
                  }
                }
              )
        }
    }
})

app.get("/getStudentsData",async(req,res)=>{
  await client.connect()
  const dbName= "edoti"
  const collectionName= "students"
  const db = client.db(dbName)
  const collection = db.collection(collectionName)
  const data =await collection.find({}, { "name": 1, "rollnum": 1, "_id": 0 }).toArray()
  res.send(data)

})

app.get("/studentAttendance",async(req,res)=>{
  const {date,rollnum} = req.query
  await client.connect()
  const db = client.db("edoti")
  const collection = db.collection("attendance")
  const info = await collection.find({
      rollnum: rollnum,
      date: date
    }, {
      attendance: 1,
      _id: 0
  }).toArray()
  res.send(info)
})


app.listen(5000,()=>console.log("server running i say..!"))
