import { NextRequest, NextResponse } from 'next/server';

interface PlaceDetailsResult {
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  website?: string;
  formatted_phone_number?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { placeId } = await request.json();
    
    if (!placeId) {
      return NextResponse.json({ error: 'Place ID is required' }, { status: 400 });
    }

    const apiKey = process.env.BACKEND_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Google Maps API key is not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,rating,opening_hours,website,formatted_phone_number&key=${apiKey}&language=ja`
    );

    if (!response.ok) {
      throw new Error(`Place Details API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      const result = data.result as PlaceDetailsResult;
      const details = {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        name: result.name,
        address: result.formatted_address,
        rating: result.rating,
        openingHours: result.opening_hours,
        website: result.website,
        phoneNumber: result.formatted_phone_number
      };

      return NextResponse.json({ details });
    } else {
      console.warn(`Place details failed for place_id: ${placeId}`, data.status);
      return NextResponse.json({ error: 'Place details not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error during place details request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 