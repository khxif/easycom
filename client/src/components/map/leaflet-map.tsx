import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  position: [number, number];
  place: string;
  city: string;
}

export function LeafletMap({ place, city, position }: LeafletMapProps) {
  return (
    <div className="h-[400px] w-full">
      <MapContainer center={[15.3173, 75.7139]} zoom={5} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomToMarker position={position} />
        <Marker position={position}>
          <Popup>
            <strong>{place}</strong> - {city}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

function ZoomToMarker({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 2 }); // Smooth zooming to the marker
    }
  }, [position, map]);

  return null;
}
