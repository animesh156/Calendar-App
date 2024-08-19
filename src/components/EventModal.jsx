/* eslint-disable react/prop-types */

import Modal from "react-modal";
import EventForm from "./EventForm";
import { MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

Modal.setAppElement("#root");

const EventModal = ({
  isOpen,
  closeModal,
  addEvent,
  events,
  selectedDate,
  deleteEvent,
}) => {
  const [test, setTest] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [EventIndex, setEventIndex] = useState(0);
  const [updateDescription,setUpdateDis] = useState("")

  const handleUpdate = (e) => {
    e.preventDefault();
    setTest(false);
  

    {
      events
        .filter(
          (event) =>
            new Date(event.date).toDateString() === selectedDate.toDateString()
        )
        .map((event, ind) =>
          EventIndex === ind ? ( (event.description = updateDescription) && (event.title = updateTitle)) : event
        );
    }
  };

  const handle = (indexId) => {
    setTest(true);
    setEventIndex(indexId);
    console.log(updateDescription)
    setUpdateTitle('')
    setUpdateDis('')
   
  };

  return (

    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Event Modal"
  >
   
  
      <h3 className="text-center">Events on {selectedDate.toDateString()}</h3>

     {test ? (
      
        <form className="flex items-center rounded-2xl flex-col border-2 border-red-400 w-[500px] h-80 m-auto  " onSubmit={handleUpdate}>
          <input
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            className="bg-cyan-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-8"
            placeholder="enter updated title"
            required
          />

          <textarea  value={updateDescription}  onChange={(e) => setUpdateDis(e.target.value)}  rows="4" cols="50" className="block px-4 py-1.5 mt-6 mb-6  text-sm text-gray-900 bg-cyan-100 rounded-lg border border-slate-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Details..."></textarea>

          <button  className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 mt-5   text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Update</button>
        </form>
      ) : (

<>
         <EventForm
      selectedDate={selectedDate}
      onSubmit={addEvent}
      closeModal={closeModal}
    />

      
        <ul>


          {events
            .filter(
              (event) =>
                new Date(event.date).toDateString() ===
                selectedDate.toDateString()
            )
            .map((event, index) => (
              <li
                className="text-center mt-3 bg-slate-200 w-auto px-2 py-2 flex justify-evenly"
                key={index}
              >
                {event.title} - {event.description} -{event.category}
                <div>
                  <button onClick={() => deleteEvent(index)} className="ml-4">
                    <MdClose />
                  </button>
                  <button className="ml-4" onClick={() => handle(index)}>
                    <FaEdit />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        </>
      )}
   </Modal>

)};

export default EventModal;
