'use client'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'

export default function MapSample() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
      <Map defaultCenter={{ lat: -34.397, lng: 150.644 }} defaultZoom={8} mapId="map">
        <AdvancedMarker position={{ lat: -34.397, lng: 150.644 }} />
      </Map>
    </APIProvider>
  )
}