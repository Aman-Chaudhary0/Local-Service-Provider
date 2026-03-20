import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const AddServicePopup = ({ isServiceAdd, setIsServiceAdd }) => {

    // set error,success state
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [emptyMessage, setEmptyMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // formData to get data from form
    const [formData, setFormData] = useState({
        serviceName: "",
        experience: "",
        charge: "",
    })

    // handle changes when input values in form
    const handleChange = (e) => {

        // handle error ,success state on input change
        setErrorMessage("");
        setSuccessMessage("");
        setEmptyMessage("");
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    // handle form submittion
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setEmptyMessage("");

        // empty message for any input field is empty 
        if (!formData.serviceName.trim() || !formData.experience.trim() || !formData.charge.trim()) {
            setEmptyMessage("Please fill all required fields");
            return;
        }

        // fetching Api
        try {
            setIsLoading(true);
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

                // reload page after submittion
                setTimeout(() => {
                    setIsServiceAdd(true);
                    window.location.reload();
                }, 700);
                return;
            }

            setErrorMessage(res.data?.message || "Failed to add service.");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Failed to add service.");
        } finally {
            setIsLoading(false);
        }
    }



    return (    // display none after form submition
        <div style={{
            display: isServiceAdd ? "none" : "block"
        }} className='z-1 absolute bg-blue-50 border-2 border-gray-500 rounded p-4 h-90 w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

            <form onSubmit={handleSubmit}  >
                {emptyMessage && <p className='mx-2 mt-3 rounded bg-yellow-100 px-3 py-2 text-sm text-yellow-800'>{emptyMessage}</p>}
                {errorMessage && <p className='text-red-600 text-center my-2'>{errorMessage}</p>}
                {successMessage && <p className='text-green-700 text-center my-2'>{successMessage}</p>}
                {isLoading && <p className='mx-2 mt-3 rounded bg-blue-100 px-3 py-2 text-sm text-blue-700'>Adding service...</p>}
                
                <h2 className='text-center text-2xl font-semibold'>Add New Service</h2>

                <input required placeholder='Your Service' name='serviceName' value={formData.serviceName} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' onChange={handleChange} />

                <input required placeholder='Experience' name='experience' value={formData.experience} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' onChange={handleChange} />

                <input required placeholder='Charges' name='charge' value={formData.charge} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' onChange={handleChange} />

                <button disabled={isLoading} type='submit' className='bg-blue-900 w-[60%] mx-auto py-2 rounded-lg text-white font-semibold my-3 cursor-pointer disabled:bg-blue-400'>
                    {isLoading ? "Adding..." : "Add"}
                </button>

            </form>
        </div>
    )
}

export default AddServicePopup
