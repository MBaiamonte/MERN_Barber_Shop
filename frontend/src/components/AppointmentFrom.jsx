import React, {useState, useEffect} from 'react'
import { Button, Form} from 'react-bootstrap';
import axios from 'axios';
import FormContainer from './FormContainer';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const AppointmentFrom = () => {
  //Declarations
  const {loginUserId} = useUser(); // or use => const {id} = useParams()
  const [allServices, setAllServices] = useState([]);
  const [appointmentService, setAppointmentService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState();
  const [comments, setComments] = useState('');
  const navigate = useNavigate();
  const [errors,setErrors]=useState([]);
  const [allAppointments, setAllAppointments] = useState([]);


  //Handlers and Functions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services/all');
        console.log('get all services value: ', response.data);
        setAllServices(response.data);
      } catch (error) {
        console.log('error getting all services:', error);
      }
    };
    fetchData();
  }, []);
  //fetch all user appointments to ensure new appointment is unique
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments/all');
        setAllAppointments(response.data);
      } catch (error) {
        console.log('error getting all appointments:', error);
      }
    };
  
    fetchAppointments();
  }, []);
  
  const appointmentBookingHandler = async (e) => {
    e.preventDefault();
    const selectedDate = new Date(appointmentDate);
    const currentDate = new Date();
    //validate datetime is not in the past
    if (selectedDate < currentDate) {
      setErrors(['Please select a future date and time for the appointment.']);
      return;
    }
    // Check if the selected date and time already exist across all users
    const isDuplicate = allAppointments.some((appointment) => {
      const existingDate = new Date(appointment.date);
      return existingDate.toISOString() === selectedDate.toISOString(); // Compare as strings
    });
  
    if (isDuplicate) {
      setErrors(['An appointment already exists for the selected date and time.']);
      return;
    }
  
    // create new appointment object with form field data
    try {
      const newAppointment = {
        user: loginUserId,
        date: appointmentDate,
        service: appointmentService,
        comments: comments,
      };
      // Send a POST request to create a new appointment
      const response = await axios.post('http://localhost:5000/api/appointments/create', newAppointment, { withCredentials: true });
      console.log('New appointment created:', response.data);
      setAppointmentDate('');
      setComments('');
      setAppointmentService('');
      setErrors([]);
      navigate(`/profile/${loginUserId}`);
    } catch (error) {
      if (error.response?.data?.errors) {
        const dateError = error.response.data.errors.date;
        const serviceError = error.response.data.errors.service;
        const commentsError = error.response.data.errors.comments;
        // Update state with specific error messages
        setErrors([dateError?.message, serviceError?.message, commentsError?.message].filter(Boolean));
      } else {
        // Update state with a general error message
        setErrors(['An unexpected error occurred. Please try again.']);
      }
      console.error(error);
    }
  };
  return (
    <FormContainer>
      <h3>Book New Appointment</h3>
      <Form onSubmit={appointmentBookingHandler}>
        <div style={{color:"red"}}>
          {
              errors.map((err,idx)=>{
                  return(
                      <p key={idx}>{err}</p>
                  )
              })
          }
        </div>

        <Form.Group style={{display: 'none'}}>
          <Form.Control 
            type='text'
            value={loginUserId}
            readOnly
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            className=''
            type='datetime-local' 
            placeholder='Enter Date' 
            value={appointmentDate} 
            onChange={(e)=>setAppointmentDate(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Service</Form.Label>
          <Form.Select value={appointmentService} onChange={(e) => setAppointmentService(e.target.value)}>
            <option>Select Service</option>
            {allServices.map((service, idx) => (
              <option key={idx} value={service._id}>{service.title}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Comments</Form.Label>
          <Form.Control
            type='textarea'
            placeholder='Additional Comments'
            value={comments}
            onChange={(e) => {setComments(e.target.value)}}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' className='my-2'>Book Appointment</Button>
      </Form>
    </FormContainer>
  );
};

export default AppointmentFrom