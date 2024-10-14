import { useState, useEffect } from 'react';
import { ILocation } from '@/models/Location';

export function useRealTimeLocation() {
  const [location, setLocation] = useState<ILocation | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('/api/location');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setLocation(data.location);
          }
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
    const intervalId = setInterval(fetchLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return location;
}