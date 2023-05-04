import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// 
import pg from 'pg';
const { Client } = pg;
const client = new Client({connectionString: process.env.DATABASE_URL});
client.connect();
const app  = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
    res.send('Success!')
})

app.get('/api/workoutdata', async(req, res) =>{
  try {
    let result = await client.query('SELECT * FROM workoutdata');
    res.json(result.rows)
  } catch (err){
    console.error(err);
    res.status(500).json('Internal Server Error')
  }
})


app.listen(port, (error) =>{
    if (error){
        console.error(error)
    } else {
        console.log(`This server is listening on port: ${port}.`)
    }
})


