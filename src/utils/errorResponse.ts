const responseInit = {
  // 400系
  parameter: {
    status: 422,
    detail: 'Required parameters are not included in the body',
    message: 'Required parameters are not included',
  },
}

export function errorResponse(code: keyof typeof responseInit, additionalConsoleMessage = '') {
  console.error(`code: ${code}, detail: ${responseInit[code].detail}, additionalMessage: ${additionalConsoleMessage}`)
  return new Response(
    JSON.stringify({ error: responseInit[code].message }),
    {
      status: responseInit[code].status,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}