// initial form data
export const initialServiceFormData = {
  serviceName: "",
  experience: "",
  charge: "",
}

export const initialServiceFieldErrors = {
  serviceName: "",
  experience: "",
  charge: "",
}

// actual data validation
export function validateServiceForm(formData) {
  const nextErrors = { ...initialServiceFieldErrors }
  const trimmedServiceName = formData.serviceName.trim()
  const trimmedExperience = formData.experience.trim()
  const trimmedCharge = formData.charge.trim()
  const chargePattern = /^\d+(\.\d{1,2})?$/

  // validate service name
  if (!trimmedServiceName) {
    nextErrors.serviceName = "Service name is required"
  } else if (trimmedServiceName.length < 2) {
    nextErrors.serviceName = "Service name must be at least 2 characters"
  } else if (trimmedServiceName.length > 100) {
    nextErrors.serviceName = "Service name must not exceed 100 characters"
  }

  // validate experience
  if (!trimmedExperience) {
    nextErrors.experience = "Experience is required"
  } else if (trimmedExperience.length > 100) {
    nextErrors.experience = "Experience must not exceed 100 characters"
  }

  // validate charge
  if (!trimmedCharge) {
    nextErrors.charge = "Charge is required"
  } else if (trimmedCharge.length > 50) {
    nextErrors.charge = "Charge must not exceed 50 characters"
  } else if (!chargePattern.test(trimmedCharge)) {
    nextErrors.charge = "Charge must be a valid number"
  }

  return nextErrors
}
