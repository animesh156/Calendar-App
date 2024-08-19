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
  const [openForm, setOpenForm] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [EventIndex, setEventIndex] = useState(0);
  const [updateDescription,setUpdateDis] = useState("")

  const handleUpdate = (e) => {
    e.preventDefault();
    setOpenForm(false);
  

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
    setOpenForm(true);
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
   
  
    

     {openForm ? (
      
        <form className="flex relative items-center rounded-2xl flex-col border-2 border-red-400 w-[500px] h-80 m-auto  " onSubmit={handleUpdate}>
          <button onClick={() => setOpenForm(false)} className="absolute right-[5%] top-[5%]"><MdClose size={30}/></button>
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

<h3 className="text-center font-sans font-semibold text-pink-600 text-2xl mt-6">Events on {selectedDate.toDateString()}</h3>
      
        <ul>


          {events
            .filter(
              (event) =>
                new Date(event.date).toDateString() ===
                selectedDate.toDateString()
            )
            .map((event, index) => (
              <li
                className="text-center mt-3 bg-slate-50 w-auto px-2 py-2 flex justify-evenly"
                key={index}
              >
               
                <h1 className="uppercase text-red-500 font-bold">{event.title}</h1>
                <h4 className="text-green-500 font-serif font-bold">{event.category}</h4>
                <textarea className="text-orange-400 font-semibold">{event.description}</textarea>

                <div>
                  <button onClick={() => deleteEvent(index)} className="ml-4">
                    <MdClose size={25} />
                  </button>
                  <button className="ml-4" onClick={() => handle(index)}>
                    <FaEdit size={25} />
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
