import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const AddServicePopup = () => {

    // get id and state for errors
    const id = localStorage.getItem("_id");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // formData to get data from form
    const [formData, setFormData] = useState({
        id: id || "",
        serviceName: "",
        experience: "",
        charge: "",
    })

    // handle changes when input values in form
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    // handle form submittion
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // fetching Api
        try {
            const res = await axios.post("http://localhost:3000/api/add/service", formData, {
                withCredentials: true
            });

            // sending success message and empty form after submittion
            if (res.data?.success) {
                setSuccessMessage("Service added successfully.");
                setFormData((prev) => ({
                    ...prev,
                    serviceName: "",
                    experience: "",
                    charge: "",
                }));
                return;
            }

            setErrorMessage(res.data?.message || "Failed to add service.");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Failed to add service.");
        }
    }



    return (
        <div className='z-1 absolute bg-blue-50 border-2 border-gray-500 rounded p-4 h-90 w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

            <form onSubmit={handleSubmit}>
                {errorMessage && <p className='text-red-600 text-center my-2'>{errorMessage}</p>}
                {successMessage && <p className='text-green-700 text-center my-2'>{successMessage}</p>}
                <h2 className='text-center text-2xl font-semibold'>Add New Service</h2>

                <input required placeholder='Your Service' name='serviceName' value={formData.serviceName} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' onChange={handleChange} />

                <input required placeholder='Experience' name='experience' value={formData.experience} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' onChange={handleChange} />

                <input required placeholder='Charges' name='charge' value={formData.charge} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' onChange={handleChange} />

                <button type='submit' className='bg-blue-900 w-[60%] mx-auto py-2 rounded-lg text-white font-semibold my-3 cursor-pointer'>Add</button>

            </form>
        </div>
    )
}

export default AddServicePopup
