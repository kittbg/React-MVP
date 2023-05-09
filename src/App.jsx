import React from 'react';
import { useState, useEffect } from 'react'
import { Container, Col, Row, Form, Table, Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';



function App() {
  const [workouts, setWorkouts] = useState([]);
  //[{},{},{}]
  const [pullups1, setPullups1] = useState([{
    id: 1,
    reps: '',
    weight: ''
  }])

  const [dips1, setDips1] = useState([{
    id: 1,
    reps: '',
    weight: ''
  }])

  const [squats1, setSquats1] = useState([{
    id: 1,
    reps: '',
    weight: ''
  }])

  const [date, setDate] = useState(undefined)
  
  const handleSubmit= async()=>{
    // const date = moment(result.date).format('DD-MM-YYYY');
    console.log(pullups1);
    console.log(dips1);
    console.log(squats1);
    console.log(date)
    
    
    pullups1.map(element=>{element["name"]="pullups";element["date"]=date;element["duration"]=0})
    dips1.map(element=>{element["name"]="dips";element["date"]=date;element["duration"]=0})
    squats1.map(element=>{element["name"]="squats";element["date"]=date;element["duration"]=0})
    const jsonData = pullups1.concat(dips1).concat(squats1);
    
    jsonData.forEach(async (element)=>{  
      let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(element)
      }
      const response = await fetch('http://localhost:3000/api/workout',options);
      const result = await response.json();
      // const date = moment(result.date).format('DD-MM-YYYY');
      // console.log(date)
    setWorkouts((workouts)=>[...workouts,result]);
  })
  
    
  }
  const handleDelete= async (workout) =>{
    console.log(workout);
    let options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(workout)
    }
    const response = await fetch('http://localhost:3000/api/workout/',options)
    const result = await response.json();
    // const format = moment(result.date).format('DD-MM-YYYY');
    // console.log(format);
    setWorkouts(workouts => workouts.filter(w => w.id !== workout.id));
  }

  const handleChangeInputDate = (event) => {
    setDate(event.target.value);
  }
  

  const handleChangeInput = (i, e) => {
    console.log(e.target.value)
    const values = [...pullups1]
    values[i][e.target.name] = e.target.value
    setPullups1(values)
  }

  const handleChangeInput1 = (i, e) => {
    console.log(e.target.value)
    const values = [...dips1]
    values[i][e.target.name] = e.target.value
    setDips1(values)
  }

  const handleChangeInput2 = (i, e) => {
    console.log(e.target.value)
    const values = [...squats1]
    values[i][e.target.name] = e.target.value
    setSquats1(values)
  }
 
  const handleAdd = (id) => {
    const newId = pullups1.length > 0 ? pullups1[pullups1.length - 1].id + 1 : 1;
    setPullups1([...pullups1, {id: newId + 2, reps: '', weight: ''}])
  }

  const handleSubtract = (i) => {
    const values = [...pullups1]
    values.splice(i, 1)
    setPullups1([...values])
  }

  const handleAdd1 = (id) => {
    const newId = dips1.length > 0 ? dips1[dips1.length - 1].id + 1 : 1;
    setDips1([...dips1, {id: newId, reps: '', weight: ''}])
  }

  const handleSubtract1 = (i) => {
    const values = [...dips1]
    values.splice(i, 1)
    setDips1([...values])
  }

  const handleAdd2 = (id) => {
    const newId = squats1.length > 0 ? squats1[squats1.length - 1].id + 1 : 1;
    setSquats1([...squats1, {id: newId, reps: '', weight: ''}])
  }

  const handleSubtract2 = (i) => {
    const values = [...squats1]
    values.splice(i, 1)
    setSquats1([...values])
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/workout')
      .then(response => response.json())
      .then(data => {
       const formattedData = data.map(data => ({...data, date: moment(data.date).format('DD-MM-YYYY')}));
       return formattedData;
      })
      .then(data => setWorkouts(data))
 }, []);

 
 const pullups = workouts.filter(workout => workout.name === 'pullups');
 const dips = workouts.filter(workout => workout.name === 'dips');
 const squats = workouts.filter(workout => workout.name === 'squats');
  
  
  return (
    <Container>
      <Row>
        <Col className="title fs-2 fw-bold">Fitness Tracker</Col>
      </Row>
      <Row>
        <Col> 
        <Form>
         <Form.Group className="mb-3" controlId="exercise">

     
    <Row className='mt-5'>
      <Col md>
        <Form.Label>Date</Form.Label>
        <Form.Control 
          type="date" 
          placeholder="Select Date"
          name="date"
          // value={date.date}
          onChange={handleChangeInputDate}
          />
      </Col>
    </Row>

          {pullups1.map((pullups1, i)=> (
            <div key={pullups1.id}>

         <Row className='mt-4'>
         <Col md>
          <Form.Label>Pullups</Form.Label>
         <Form.Control
          type="integer" 
          placeholder="Enter reps"
          name="reps"
          value={pullups1.reps}
          onChange={e => handleChangeInput(i, e)}
           />
           </Col> 
           <Col md>
          <Form.Label>Weight</Form.Label>
         <Form.Control 
         type="integer" 
         placeholder="Enter wt"
         name='weight'
         value={pullups1.weight}
          onChange={e => handleChangeInput(i, e)}
         />
         
           </Col> 
           <Col md>
           <Button onClick={() => handleAdd(i)} className='mt-4'>
             <i className="fas fa-plus"></i>
           </Button>
           <Button  disabled={pullups1.id === 1} onClick={() => handleSubtract(i)} className='mt-4'>
             <i className='fas fa-minus'></i>
           </Button>
           </Col>
           </Row>
           </div>
           ))}

           {dips1.map((dips1, i)=> (
            <div key={dips1.id}>
           <Row className='mt-4'>
          <Col md>
          <Form.Label>Dips</Form.Label>
         <Form.Control 
         type="integer" 
         placeholder="Enter reps"
         name='reps'
         value={dips1.reps}
          onChange={e => handleChangeInput1(i, e)}
         />
           </Col> 
           <Col md>
          <Form.Label>Weight</Form.Label>
         <Form.Control 
         type="integer" 
         placeholder="Enter wt"
         name='weight'
         value={dips1.weight}
         onChange={e => handleChangeInput1(i, e)}
          />
           </Col> 
           <Col md>
           <Button onClick={() => handleAdd1(i)} className='mt-4'>
             <i className='fas fa-plus'></i>
           </Button>
           <Button disabled={dips1.id === 1}  onClick={() => handleSubtract1(i)} className='mt-4'>
             <i className='fas fa-minus'></i>
           </Button>
           </Col>
           </Row>
           </div>
           ))}

           {squats1.map((squats1, i)=> (
            <div key={dips1.id}>
           <Row className='mt-4'>
           <Col md>
          <Form.Label>Squats</Form.Label>
         <Form.Control 
         type="integer" 
         placeholder="Enter reps"
         name='reps'
         value={squats1.reps}
          onChange={e => handleChangeInput2(i, e)}
         />
           </Col> 
           <Col md>
          <Form.Label>Weight</Form.Label>
         <Form.Control 
         type="integer" 
         placeholder="Enter wt"
         name='weight'
         value={squats1.weight}
         onChange={e => handleChangeInput2(i, e)}
          />
           </Col> 
           <Col md>
           <Button onClick={() => handleAdd2(i)} className='mt-4'>
             <i className='fas fa-plus'></i>
           </Button>
           <Button disabled={squats1.id === 1} onClick={() => handleSubtract2(i)} className='mt-4'>
             <i className='fas fa-minus'></i>
           </Button>
           </Col>
           </Row>
            </div>
            ))}
          
        </Form.Group>
         
       </Form> 
       <button className="btn btn-success" style={{float: "left"}} onClick={handleSubmit}>
          Submit
         </button>
        </Col>
          <Col>
            <Table striped bordered hover size="sm mt-5">
              <thead>
                <tr>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
            {pullups.map((workout, index) => (
              <>
                <tr key={index}>
                  <td>{workout.name}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.weight}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.date}</td>
                  <button className='btn btn-danger text-white bg-danger' onClick={()=>handleDelete(workout)}>Delete</button>
                </tr>
                
                </>
            ))}
              </tbody>
              <tbody>
            {dips.map((workout, index) => (
              <>
                <tr key={index}>
                  <td>{workout.name}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.weight}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.date}</td>
                  <button className='btn btn-danger text-white bg-danger' onClick={()=>handleDelete(workout)}>Delete</button>
                </tr>
                
                </>
            ))}
              </tbody>
              <tbody>
            {squats.map((workout, index) => (
              <>
                <tr key={index}>
                  <td>{workout.name}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.weight}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.date}</td>
                  <button className='btn btn-danger text-white bg-danger' onClick={()=>handleDelete(workout)}>Delete</button>
                </tr>
                
              </>
            ))}
              </tbody>
            </Table>
          </Col>
      </Row>
    </Container>
  );
}

export default App

