import { Location } from '@/atoms';

// Google Places APIを使用して場所の詳細情報を取得（API Route経由）
export async function searchPlaces(query: string): Promise<Location[]> {
  try {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Places API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.locations) {
      return data.locations;
    } else {
      console.warn(`Places search failed for query: ${query}`, data.error);
      return [];
    }
  } catch (error) {
    console.error('Error during places search:', error);
    return [];
  }
} 