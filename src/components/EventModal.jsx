/* eslint-disable react/prop-types */

import Modal from 'react-modal';
import EventForm from './EventForm';
import { MdClose } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

Modal.setAppElement('#root');

const EventModal = ({ isOpen, closeModal, addEvent, events, selectedDate, editEvent, deleteEvent }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Event Modal"
        >
            <EventForm
                selectedDate={selectedDate}
                onSubmit={addEvent}
                closeModal={closeModal}
            />
            <h3 className='text-center'>Events on {selectedDate.toDateString()}</h3>
            <ul >
                {events
                    .filter(event => new Date(event.date).toDateString() === selectedDate.toDateString())
                    .map((event, index) => (
                        <li className='text-center mt-3 bg-slate-200 w-auto px-2 py-2 flex justify-evenly' key={index}>
                            {event.title} - {event.description}

                            <div>
                            <button onClick={() => deleteEvent(index)} className='ml-4'><MdClose /></button>
                            <button className='ml-4' onClick={() => editEvent(index, {...event, title: 'Edited Event'})}><FaEdit /></button>
                            </div>
                            
                        </li>
                    ))}
            </ul>
        </Modal>
    );
};

export default EventModal;
