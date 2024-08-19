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
    setSelectedCategory("All");
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
                    className="bg-red-200 mb-1 w-auto overflow-hidden text-stone-950 font-semibold font-sans uppercase"
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
        <Box sx={style} className="relative w-auto h-96 overflow-y-scroll">
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

          {selectedCategory !== "All"
            ? events
                .filter(
                  (event) =>
                    new Date(event.date).toDateString() ===
                    selectedDate.toDateString()
                )
                .filter((event) => event.category === selectedCategory)
                .map((event) => (
                  <>
                    <div className="max-w-sm mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
                        <img
                          className="rounded-t-lg w-full h-36"
                          src="https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                      </a>
                      <div className="p-5">
                        <h1
                          id="modal-modal-title"
                          className="text-3xl font-bold text-red-500 mb-5 text-center uppercase "
                        >
                          {event.title}
                        </h1>

                        <h3
                          id="modal-modal-description"
                          rows="3"
                          cols="30"
                          className="text-center text-orange-400 font-semibold  text-2xl  h-auto   break-words mb-5"
                        >
                          {event.category}
                        </h3>
                        <textarea
                          id="modal-modal-description"
                          rows="3"
                          cols="25"
                          className="border-red-300 text-center border-2 text-violet-600  text-md font-semibold  w-auto  h-auto   break-words"
                        >
                          {event.description}
                        </textarea>
                      </div>
                    </div>
                   
                  </>
                ))
            : events
                .filter(
                  (event) =>
                    new Date(event.date).toDateString() ===
                    selectedDate.toDateString()
                )

                .map((event) => (
                  <>
                    <div className="max-w-sm mt-4 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
                        <img
                          className="rounded-t-lg h-36 w-full"
                          src="https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                      </a>
                      <div className="p-5">
                        <h1
                          id="modal-modal-title"
                          className="text-3xl font-bold text-red-600 mb-5 text-center uppercase "
                        >
                          {event.title}
                        </h1>

                        <h3
                          id="modal-modal-description"
                          rows="3"
                          cols="25"
                          className="text-center  text-2xl text-yellow-400 font-semibold  h-auto   break-words mb-5"
                        >
                          {event.category}
                        </h3>
                        <textarea
                          id="modal-modal-description"
                          rows="3"
                          cols="25"
                          className="border-red-300 text-center border-2 text-violet-600  text-md font-semibold  w-auto  h-auto   break-words"
                        >
                          {event.description}
                        </textarea>
                      </div>
                    </div>
                  </>
                ))}
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
