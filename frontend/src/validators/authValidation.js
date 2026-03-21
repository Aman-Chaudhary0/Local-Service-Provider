// initial form data
export const initialAuthFormData = {
  username: "",
  email: "",
  password: "",
}

// validate formdata
export function validateAuthForm({ formData, currState }) {
  const nextErrors = {}
  const isSignUp = currState === "Sign Up"
  const trimmedUsername = formData.username.trim()
  const trimmedEmail = formData.email.trim()
  const trimmedPassword = formData.password.trim()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/

  // valdate username
  if (isSignUp) {
    if (!trimmedUsername) {
      nextErrors.username = "Name is required"
    } else if (trimmedUsername.length < 4) {
      nextErrors.username = "Name must be at least 4 characters"
    } else if (trimmedUsername.length > 15) {
      nextErrors.username = "Name must not exceed 15 characters"
    }
  }

  // validate email
  if (!trimmedEmail) {
    nextErrors.email = "Email is required"
  } else if (!emailPattern.test(trimmedEmail)) {
    nextErrors.email = "Enter a valid email address"
  }

  // validate password
  if (!trimmedPassword) {
    nextErrors.password = "Password is required"
  } else if (isSignUp) {
    if (trimmedPassword.length < 4) {
      nextErrors.password = "Password must be at least 4 characters"
    } else if (trimmedPassword.length > 20) {
      nextErrors.password = "Password must not exceed 20 characters"
    } else if (!strongPasswordPattern.test(trimmedPassword)) {
      nextErrors.password = "Password must include uppercase, lowercase, number, and special character"
    }
  } else if (trimmedPassword.length > 20) {
    nextErrors.password = "Password must not exceed 20 characters"
  }

  return nextErrors
}
