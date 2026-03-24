import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { initialServiceFormData, validateServiceForm } from '../validators/serviceValidation'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'

const AddServicePopup = ({ isServiceAdd, setIsServiceAdd }) => {

    // set error,success state
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [emptyMessage, setEmptyMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // formData to get data from form
    const [formData, setFormData] = useState(initialServiceFormData)

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
        const validationErrors = validateServiceForm(formData)

        // empty message for any input field is empty 
        if (Object.values(validationErrors).some(Boolean)) {
            setErrorMessage(Object.values(validationErrors).find(Boolean) || "Please enter valid service details");
            return;
        }

        // fetching Api
        try {
            setIsLoading(true);
            const res = await axios.post("http://localhost:3000/api/add/service", {
                serviceName: formData.serviceName.trim(),
                experience: formData.experience.trim(),
                charge: formData.charge.trim(),
            }, {
                withCredentials: true
            });
            const apiResponse = normalizeApiResponse(res, "Service added successfully.");

            // sending success message and empty form after submittion
            if (apiResponse.ok) {
                setSuccessMessage(apiResponse.message);
                setFormData(initialServiceFormData);

                // reload page after submittion
                setTimeout(() => {
                    setIsServiceAdd(true);
                    window.location.reload();
                }, 700);
                return;
            }

            setErrorMessage(apiResponse.message || "Failed to add service.");
        } catch (error) {
            setErrorMessage(getApiErrorMessage(error, "Failed to add service."));
        } finally {
            setIsLoading(false);
        }
    }


//============================================================================================================================================================//
    return (    // display none after form submition
        <div style={{
            display: isServiceAdd ? "none" : "block"
        }} className='absolute left-1/2 top-1/2 z-10 w-[min(420px,calc(100%-24px))] -translate-x-1/2 -translate-y-1/2'>

            <form onSubmit={handleSubmit} className='surface-card flex flex-col gap-4 bg-slate-50 p-6'>
                {emptyMessage && <p className='feedback-banner feedback-warning'>{emptyMessage}</p>}
                {errorMessage && <p className='feedback-banner feedback-error'>{errorMessage}</p>}
                {successMessage && <p className='feedback-banner feedback-success'>{successMessage}</p>}
                {isLoading && <p className='feedback-banner feedback-info'>Adding service...</p>}

                <div className='space-y-1 text-center'>
                  <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-700'>Admin Service</p>
                  <h2 className='text-3xl font-semibold tracking-tight text-slate-900'>Add new service</h2>
                </div>

                <input placeholder='Your Service' name='serviceName' value={formData.serviceName} className='field-input' onChange={handleChange} />

                <input placeholder='Experience' name='experience' value={formData.experience} className='field-input' onChange={handleChange} />

                <input placeholder='Charges' name='charge' value={formData.charge} className='field-input' onChange={handleChange} />

                <button disabled={isLoading} type='submit' className='primary-button mt-2 py-3'>
                    {isLoading ? "Adding..." : "Add"}
                </button>

            </form>
        </div>
    )
}

export default AddServicePopup
