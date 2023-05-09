import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
// 
import pg from 'pg';
const { Client } = pg;
const client = new Client({connectionString: process.env.DATABASE_URL});
client.connect();
const app  = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
    res.send('Success!')
})

app.get('/api/workout', async(req, res) =>{
  try {
    let result = await client.query('SELECT sets.id, workout.date, exercise.name,  sets.reps, sets.weight, sets.duration FROM workout_exercise JOIN workout ON workout.id = workout_exercise.workout_id JOIN exercise ON exercise.id = workout_exercise.exercise_id JOIN sets ON workout_exercise.exercise_id = sets.exercise_id');
    res.json(result.rows)
  } catch (err){
    console.error(err);
    res.status(500).json('Internal Server Error')
  }
})

app.get(`/api/workout/date`, async(req, res) =>{
  try {
    let result = await client.query('SELECT workout.date, exercise.name,  sets.reps, sets.weight, sets.duration FROM workout_exercise JOIN workout ON workout.id = workout_exercise.workout_id JOIN exercise ON exercise.id = workout_exercise.exercise_id JOIN sets ON workout_exercise.exercise_id = sets.exercise_id WHERE workout_exercise.workout_id = 1');
    res.json(result.rows)
  } catch (err){
    console.error(err);
    res.status(500).json('Internal Server Error')
  }
})

app.post('/api/workout', async (req, res) => {
   let date = req.body.date;
   let name = req.body.name;
   let reps = req.body.reps;
   let weight = req.body.weight;
   let duration = req.body.duration;
   
  console.log(req.body)
  try{
    client.query(`INSERT INTO workout(date) VALUES ($1) RETURNING *`,[date])
    .then(dateRes=>{
      client.query(`INSERT INTO exercise(name) VALUES ($1) RETURNING *`,[name])
      .then(nameRes=>{
        client.query(`INSERT INTO workout_exercise(workout_id, exercise_id) VALUES ($1, $2) RETURNING *`,[dateRes.rows[0].id,nameRes.rows[0].id])
        .then(weRes=>{
          client.query(`INSERT INTO sets (reps, weight, duration, exercise_id, workout_exercise_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,[reps,weight,duration,nameRes.rows[0].id,weRes.rows[0].id])
          .then(setRes=>{
            
            res.send({
              date : dateRes.rows[0].date,
              name : nameRes.rows[0].name,
              reps : setRes.rows[0].reps,
              weight : setRes.rows[0].weight,
              duration: setRes.rows[0].duration
              
            })
          })
        })
      })
    })
    
  } catch (err){
    console.error(err)
    res.json('Internal Server Error').status(500)
  }
})
app.delete('/api/workout', async(req,res)=>{
  let data = req.body;
  let userInput = data.id
  if (isNaN(data.id)) return res.send('Bad Request').status(400);
  await client.query(`DELETE FROM sets WHERE ID = $1 RETURNING *`, [userInput])
  .then(response=> res.send(response.rows[0]));
  
})

app.listen(port, (error) =>{
    if (error){
        console.error(error)
    } else {
        console.log(`This server is listening on port: ${port}.`)
    }
});


