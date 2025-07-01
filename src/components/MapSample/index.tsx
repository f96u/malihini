'use client'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { useAtomValue, useSetAtom } from 'jotai'
import { locationsAtom } from '@/atoms'
import { useMemo } from 'react'

export default function MapSample() {
  const locations = useAtomValue(locationsAtom)
  const setLocations = useSetAtom(locationsAtom)

  // 地図の中心とズームレベルを計算
  const mapCenter = useMemo(() => {
    if (locations.length === 0) {
      return { lat: 35.6812, lng: 139.7644 }; // 東京駅
    }
    
    const lats = locations.map(loc => loc.lat);
    const lngs = locations.map(loc => loc.lng);
    
    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
    
    return { lat: centerLat, lng: centerLng };
  }, [locations]);

  const mapZoom = useMemo(() => {
    if (locations.length === 0) return 5; // 日本全体
    if (locations.length === 1) return 10; // 単一の場所
    return 6; // 複数の場所
  }, [locations]);

  const clearLocations = () => {
    setLocations([]);
  };

  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
        <Map 
          center={mapCenter}
          zoom={mapZoom}
          mapId="map"
          style={{ width: '100%', height: '400px' }}
        >
          {/* デフォルトのマーカー */}
          <AdvancedMarker position={{ lat: 35.6812, lng: 139.7644 }} title="東京駅" />
          
          {/* チャットから抽出された場所のマーカー */}
          {locations.map((location, index) => (
            <AdvancedMarker 
              key={index}
              position={{ lat: location.lat, lng: location.lng }} 
              title={`${location.name}${location.rating ? ` (評価: ${location.rating})` : ''}`}
            />
          ))}
        </Map>
      </APIProvider>
      
      {/* 場所の詳細情報を表示 */}
      {locations.length > 0 && (
        <div className="mt-4 p-4 bg-black/10 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">検索された場所:</h3>
            <button
              onClick={clearLocations}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              クリア
            </button>
          </div>
          <div className="space-y-2">
            {locations.map((location, index) => (
              <div key={index} className="p-2 bg-black/5 rounded">
                <div className="font-medium">{location.name}</div>
                {location.address && (
                  <div className="text-sm text-gray-600">{location.address}</div>
                )}
                {location.rating && (
                  <div className="text-sm text-yellow-600">評価: {location.rating}/5</div>
                )}
                {location.types && location.types.length > 0 && (
                  <div className="text-xs text-gray-500">
                    カテゴリ: {location.types.slice(0, 3).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}