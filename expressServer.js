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
    let result = await client.query('SELECT workout.date, exercise.name,  sets.reps, sets.weight, sets.duration FROM workout_exercise JOIN workout ON workout.id = workout_exercise.workout_id JOIN exercise ON exercise.id = workout_exercise.exercise_id JOIN sets ON workout_exercise.exercise_id = sets.exercise_id WHERE workout_exercise.workout_id = 1');
    res.json(result.rows)
  } catch (err){
    console.error(err);
    res.status(500).json('Internal Server Error')
  }
})

app.post('/api/workoutdata', async(req, res) => {
    let pullupSet1 = req.body.pullupSet1;
    let pullUpSet1Wt = req.body.pullUpSet1Wt;
    let pullupSet2 = req.body.pullUpSet2Wt;
    let pullUpSet2Wt = req.body.pullUpSet2Wt;
    let pullupSet3 = req.body.pullupSet3;
    let pullUpSet3Wt = req.body.pullUpSet3Wt;
    let pullupSet4 = req.body.pullupSet4;
    let pullUpSet4Wt = req.body.pullUpSet4Wt;
    let pullupSet5 = req.body.pullupSet5;
    let pullUpSet5Wt = req.body.pullUpSet5Wt;
    let dipSet1 = req.body.dipSet1;
    let dipSet1Wt = req.body.dipSet1Wt;
    let dipSet2 = req.body.dipSet2;
    let dipSet2Wt = req.body.dipSet2Wt;
    let dipSet3 = req.body.dipSet3;
    let dipSet3Wt = req.body.dipSet3Wt;
    let dipSet4 = req.body.dipSet4;
    let dipSet4Wt = req.body.dipSet4Wt;
    let dipSet5 = req.body.dipSet5;
    let dipSet5Wt = req.body.dipSet5Wt;
    let squatSet1 = req.body.squatSet1;
    let squatSet1Wt = req.body.squatSet1Wt;
    let squatSet2 = req.body.squatSet2;
    let squatSet2Wt = req.body.squatSet2Wt;
    let squatSet3 = req.body.squatSet3;
    let squatSet3Wt = req.body.dipSet3Wt;
    let squatSet4 = req.body.dipSet4;
    let squatSet4Wt = req.body.dipSet4Wt;
    let squatSet5 = req.body.dipSet5;
    let squatSet5Wt = req.body.dipSet5Wt;
    let pullUpTime = req.body.pullUpTime;
    let dipTime = req.body.dipTime;
    let squatTime = req.body.squatTime;
    let wkDate = req.body.wkDate;
  try{
    await client.query('INSERT INTO workoutdata (pullupSet1, pullUpSet1Wt, pullupSet2, pullUpSet2Wt, pullupSet3, pullUpSet3Wt, pullupSet4, pullUpSet4Wt, pullupSet5, pullUpSet5Wt, pullUpTime, dipSet1, dipSet1Wt, dipSet2, dipSet2Wt, dipSet3, dipSet3Wt, dipSet4, dipSet4Wt, dipSet5, dipSet5Wt, dipTime, squatSet1, squatSet1Wt, squatSet2, squatSet2Wt, squatSet3, squatSet3Wt, squatSet4, squatSet4Wt, squatSet5, squatSet5Wt, squatTime, wkDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34', [pullupSet1, pullUpSet1Wt, pullupSet2, pullUpSet2Wt, pullupSet3, pullUpSet3Wt, pullupSet4, pullUpSet4Wt, pullupSet5, pullUpSet5Wt, pullUpTime, dipSet1, dipSet1Wt, dipSet2, dipSet2Wt, dipSet3, dipSet3Wt, dipSet4, dipSet4Wt, dipSet5, dipSet5Wt, dipTime, squatSet1, squatSet1Wt, squatSet2, squatSet2Wt, squatSet3, squatSet3Wt, squatSet4, squatSet4Wt, squatSet5, squatSet5Wt, squatTime, wkDate]);
    res.json('Workout added!')
  } catch (err){
    console.error(err)
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


