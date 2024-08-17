/* eslint-disable react/prop-types */
import  { useState } from 'react';

const EventForm = ({ selectedDate, onSubmit, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { title, description, date: selectedDate };
        onSubmit(newEvent);
        setTitle('');
        setDescription('');
        closeModal();
    };

    return (
        // <form onSubmit={handleSubmit} className='flex justify-center m-auto flex-col'>
        //     <h2>Add Event</h2>
        //     <input
        //         type="text"
        //         placeholder="Event Title"
        //         value={title}
        //         onChange={(e) => setTitle(e.target.value)}
        //         required
        //     />
        //     <textarea
        //         placeholder="Event Description"
        //         value={description}
        //         onChange={(e) => setDescription(e.target.value)}
        //         required
        //     />
        //     <button type="submit">Save Event</button>
        // </form>

<>

<h2 className='text-center mb-6'>Add Events</h2>
<form className="flex justify-center" onSubmit={handleSubmit}>
   
<div className="mr-10">
  
  <input
    type="text"
   value={title}
   onChange={(e) => setTitle(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Event Title..."
    required=""
  />
</div>

<div className="mr-5">

<textarea id="description" value={description}  onChange={(e) => setDescription(e.target.value)}  rows="4" cols="50" className="block px-4 py-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Details..."></textarea>

</div>

<div>
<button
  type="submit"
  className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 ml-6   text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
>
  Add
</button>

</div>

</form>

</>






    );
};

export default EventForm;
