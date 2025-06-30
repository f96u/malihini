import { errorResponse } from "@/utils/errorResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  if (!query) {
    return errorResponse('parameter', 'Query is required')
  }

  try {

    const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=formatted_address,name,place_id&key=${process.env.BACKEND_GOOGLE_MAP_API_KEY}`)
    const data = await response.json()
    return new Response(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch place data' }), { status: 500 })
  }
}