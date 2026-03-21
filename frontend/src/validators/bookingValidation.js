export const initialBookingFieldErrors = {
  date: "",
  time: "",
  address: "",
}

// validate form data
export function validateBookingForm(formData) {
  const nextErrors = { ...initialBookingFieldErrors }
  const trimmedAddress = formData.address.trim()
  const selectedDateTime = formData.date && formData.time
    ? new Date(`${formData.date}T${formData.time}`)
    : null
  const now = new Date()

  // validate form date
  if (!formData.date) {
    nextErrors.date = "Please select a booking date"
  } else if (selectedDateTime && selectedDateTime < now) {
    nextErrors.date = "Booking date and time cannot be in the past"
  }

  // validate time
  if (!formData.time) {
    nextErrors.time = "Please select a booking time"
  }

  // validate adderss
  if (!trimmedAddress) {
    nextErrors.address = "Address is required"
  } else if (trimmedAddress.length < 10) {
    nextErrors.address = "Address must be at least 10 characters"
  }

  return nextErrors
}
