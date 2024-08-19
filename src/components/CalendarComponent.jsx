import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventModal from "./EventModal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import Filter from "./Filter";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // const [eventIndex, setEventIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory('All')
  };

  const handleEventDetails = (e) => {
    setOpen(true);
    e.stopPropagation();

    // setEventIndex(e.target.value)
  };

  return (
    <div>
      <Calendar
        className="mt-12 bg-cyan-50 md:w-[740px] "
        onClickDay={handleDateClick}
        value={selectedDate}
        tileContent={({ date, view }) =>
          view === "month" && (
            <ul>
              {events
                .filter(
                  (event) =>
                    new Date(event.date).toDateString() === date.toDateString()
                )
                .map((event, index) => (
                  <li
                    onClick={handleEventDetails}
                    key={index}
                    value={index}
                    className="bg-red-300 mb-1 w-auto overflow-hidden border-green-700"
                  >
                    {event.title}
                  </li>
                ))}
            </ul>
          )
        }
      />
      <EventModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        addEvent={addEvent}
        events={events}
        selectedDate={selectedDate}
        setModalIsOpen={setModalIsOpen}
        setOpen={setOpen}
        deleteEvent={deleteEvent}
        open={open}
      />

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="relative w-auto h-auto">
          {/* <h4 className="text-2xl absolute top-[5%] left-[30%] mb-5">Event Details</h4> */}
          <button
            onClick={handleClose}
            className="absolute left-[90%] top-[10%]"
          >
            <AiOutlineClose />
          </button>

          <Filter
            categories={["Work", "Personal"]}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            setSelectedCategory={setSelectedCategory}
          />


          {selectedCategory !=='All'    ?   (events.filter(
              (event) =>
                new Date(event.date).toDateString() ===
                selectedDate.toDateString()
            )
            .filter((event) => event.category === selectedCategory)
            .map((event) => (
              <>
                <div className="text-center flex flex-col items-center mt-7 w-60 lg:w-[420px]">
                  <h1
                    id="modal-modal-title"
                    className="text-3xl mb-5 uppercase"
                  >
                    {event.title}
                  </h1>
                  <h1
                    id="modal-modal-description"
                    rows="3"
                    cols="30"
                    className="border-red-300 border-2  text-2xl  w-60 lg:w-[400px] h-auto   break-words"
                  >
                    {event.description}
                  </h1>

                  <h1
                    id="modal-modal-description"
                    rows="3"
                    cols="30"
                    className="border-red-300 border-2  text-2xl  w-60 lg:w-[400px] h-auto   break-words"
                  >
                    {event.category}
                  </h1>
                </div>
              </>
            )))  :

            (
              events
                .filter(
                  (event) =>
                    new Date(event.date).toDateString() ===
                    selectedDate.toDateString()
                )
               
                .map((event) => (
                  <>
                    <div className="text-center flex flex-col items-center mt-7 w-60 lg:w-[420px]">
                      <h1
                        id="modal-modal-title"
                        className="text-3xl mb-5 uppercase"
                      >
                        {event.title}
                      </h1>
                      <h1
                        id="modal-modal-description"
                        rows="3"
                        cols="30"
                        className="border-red-300 border-2  text-2xl  w-60 lg:w-[400px] h-auto   break-words"
                      >
                        {event.description}
                      </h1>
    
                      <h1
                        id="modal-modal-description"
                        rows="3"
                        cols="30"
                        className="border-red-300 border-2  text-2xl  w-60 lg:w-[400px] h-auto   break-words"
                      >
                        {event.category}
                      </h1>
                    </div>
                  </>
                ))
            )
          
          
          }

         
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
