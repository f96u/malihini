'use client'
import { useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
export default function MapSample() {

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
      version: 'weekly',
    })
    loader
      .importLibrary('maps')
      .then(({ Map }) => {
        new Map(document.getElementById('map') as HTMLElement, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        })
      })
  }, [])

  return (
    <>
      <h1>Map Sample</h1>
      <div id="map" style={{ width: '100%', height: '400px' }} />
    </>
  )
}