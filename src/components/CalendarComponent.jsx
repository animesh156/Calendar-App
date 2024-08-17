import  { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventModal from './EventModal';
import Box from '@mui/material/Box';
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [open,setOpen]= useState(false)

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setModalIsOpen(true);
    };

    const addEvent = (event) => {
        setEvents([...events, event]);
        setModalIsOpen(false);
    };

    const deleteEvent = (index) => {
        setEvents(events.filter((_, i) => i !== index));
    };

    const editEvent = (index, updatedEvent) => {
        const updatedEvents = [...events];
        updatedEvents[index] = updatedEvent;
        setEvents(updatedEvents);
    };

    const handleClose = () =>{
        setOpen(false)
    }

    const handleEventDetails = (e) => {
        setOpen(true);
        e.stopPropagation()
    }

    return (
        <div>
            <Calendar
                onClickDay={handleDateClick}
                value={selectedDate}
               
                tileContent={({ date, view }) =>
                    view === 'month' && (
                        <div>
                            {events
                                .filter(event => new Date(event.date).toDateString() === date.toDateString())
                                .map((event, index) => (
                                    <p onClick={handleEventDetails} 
                                        key={index} className='bg-red-300'>{event.title}</p>
                                ))}
                        </div>
                    )
                }
            />
            <EventModal
                isOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
                addEvent={addEvent}
                events={events}
                selectedDate={selectedDate}
                editEvent={editEvent}
                deleteEvent={deleteEvent}
            />



<Modal
        open={open}
      
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <button onClick={handleClose}><AiOutlineClose /></button>
        <button ><MdOutlineModeEdit /></button>
        <button ><MdDelete /></button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        
        </Box>
      </Modal>




        </div>
    );
};

export default CalendarComponent;
