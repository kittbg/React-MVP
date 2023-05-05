import { useState, useEffect } from 'react'
import { Container, Col, Row, Card, ListGroup, Table } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';


function App() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/workout')
      .then(response => response.json())
      .then(data => {
       const formattedData = data.map(data => ({...data, date: moment(data.date).format('DD-MM-YYYY')}));
       return formattedData
      })
      .then(data => setWorkouts(data))
 }, []);

 
 const pullups = workouts.filter(workout => workout.name === 'pullups');
 const dips = workouts.filter(workout => workout.name === 'dips');
 const squats = workouts.filter(workout => workout.name === 'squats');
  
  
  return (
    <Container>
      <Row>
        <Col>Fitness Tracker</Col>
      </Row>
      <Row>
        <Col>1 of 2</Col>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
            {pullups.map((workout, index) => (
                <tr key={index}>
                  <td>{workout.name}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.weight}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.date}</td>
                </tr>
            ))}
              </tbody>
              <tbody>
            {dips.map((workout, index) => (
                <tr key={index}>
                  <td>{workout.name}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.weight}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.date}</td>
                </tr>
            ))}
              </tbody>
              <tbody>
            {squats.map((workout, index) => (
                <tr key={index}>
                  <td>{workout.name}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.weight}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.date}</td>
                </tr>
            ))}
              </tbody>
            </Table>
          </Col>
      </Row>
    </Container>
  );
}

export default App

