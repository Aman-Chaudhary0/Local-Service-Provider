// get response from api
function getPayload(source) {
  return source?.data ?? {}
}

// get error if api fetch failed
export function getApiErrorMessage(error, fallbackMessage = "Something went wrong") {

  // get error
  const payload = getPayload(error?.response)

  // return error
  return payload.errors?.[0]?.message || payload.message || fallbackMessage
}

// normalise api response 
export function normalizeApiResponse(response, fallbackMessage = "Request completed") {
  // get res
  const payload = getPayload(response)


  return {
    // ok when success true
    ok: typeof payload.success === "boolean" ? payload.success : Boolean(payload.data),

    // message,data,errors
    message: payload.message || fallbackMessage,
    data: payload.data ?? null,
    errors: Array.isArray(payload.errors) ? payload.errors : [],
  }
}
