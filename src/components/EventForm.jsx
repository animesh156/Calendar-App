/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { MdClose } from 'react-icons/md';

const EventForm = ({ selectedDate, onSubmit, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category,setCategory] = useState('Work')
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { title, description,category, date: selectedDate };
        onSubmit(newEvent);

        setTitle('');
        setDescription('');
        setCategory('')
        closeModal();
    };

    
    const handle = () => {
      closeModal()
    }

    return (
      

<div className='relative'>

<h1 className='text-center mb-6 text-2xl font-bold'>Add Events</h1>
<button className='absolute right-[3%] top-[5%]' onClick={handle}><MdClose size={35}/></button>

<form className="flex flex-col justify-center" onSubmit={handleSubmit}>
   
<div className="mb-5">
  
  <input
    type="text"
   value={title}
   onChange={(e) => setTitle(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Event Title..."
    required=""
  />
</div>

<div className="mb-5">

<textarea id="description" value={description}  onChange={(e) => setDescription(e.target.value)}  rows="4" cols="30" className="block px-4 py-1.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Details..."></textarea>

</div>

<div className="mb-5 m-auto">
<select value={category} className='bg-slate-300' onChange={(e) => setCategory(e.target.value)}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
            </select>
</div>

<div className='m-auto'>
<button
  type="submit"
  className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 ml-6   text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
>
  Add Event
</button>

</div>

</form>

</div>






    );
};

export default EventForm;
