export function getApiErrorMessage(error, fallbackMessage = "Something went wrong") {
  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors[0]?.message || fallbackMessage
  }

  return error?.response?.data?.message || fallbackMessage
}

export function getApiData(response) {
  return response?.data?.data ?? null
}
