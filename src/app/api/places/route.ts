import { NextRequest, NextResponse } from 'next/server';

interface PlaceResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  formatted_address: string;
  place_id: string;
  rating?: number;
  types: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.BACKEND_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Google Maps API key is not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&language=ja`
    );

    if (!response.ok) {
      throw new Error(`Places API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const locations = data.results.map((place: PlaceResult) => ({
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        name: place.name,
        address: place.formatted_address,
        placeId: place.place_id,
        rating: place.rating,
        types: place.types
      }));

      return NextResponse.json({ locations });
    } else {
      console.warn(`Places search failed for query: ${query}`, data.status);
      return NextResponse.json({ locations: [] });
    }
  } catch (error) {
    console.error('Error during places search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 