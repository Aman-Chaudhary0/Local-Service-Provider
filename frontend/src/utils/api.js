
// function for api error when failed
export function getApiErrorMessage(error, fallbackMessage = "Something went wrong") {

  // get first error or fallback msg
  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors[0]?.message || fallbackMessage
  }

  return error?.response?.data?.message || fallbackMessage
}

// function to normalize api
export function normalizeApiResponse(response, fallbackMessage = "Request completed") {
  const payload = response?.data ?? {}
  const hasSuccessFlag = typeof payload.success === "boolean"

  return {

    // ok when api is success
    ok: hasSuccessFlag ? payload.success : Boolean(payload.data),
    message: payload.message || fallbackMessage,
    data: payload.data ?? null,
    meta: payload.meta ?? null,
    errors: Array.isArray(payload.errors) ? payload.errors : [],
  }
}

// function to gete data from api
export function getApiData(response) {
  return response?.data?.data ?? null
}
