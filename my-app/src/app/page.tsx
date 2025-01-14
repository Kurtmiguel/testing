'use client';

import { useRealTimeLocation } from '../hooks/useRealTimeLocation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  const location = useRealTimeLocation();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Smart Dog Collar Location</h2>
                {location ? (
                  <>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                    <p>Last Update: {new Date(location.timestamp).toLocaleString()}</p>
                    <div style={{ height: '400px', width: '100%' }}>
                      {typeof window !== 'undefined' && (
                        <MapContainer 
                          center={[location.latitude, location.longitude] as LatLngExpression} 
                          zoom={13} 
                          style={{ height: '100%', width: '100%' }}
                        >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <Marker position={[location.latitude, location.longitude] as LatLngExpression}>
                            <Popup>
                              Dog's location<br />
                              Last update: {new Date(location.timestamp).toLocaleString()}
                            </Popup>
                          </Marker>
                        </MapContainer>
                      )}
                    </div>
                  </>
                ) : (
                  <p>Loading location data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}