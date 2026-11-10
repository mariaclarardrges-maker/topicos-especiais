import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function MapController({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 2);
  }, [center, map]);

  return null;
}

export function MapView({ center, selectedPlace, userLocation, routePoints, layer, places, onSelectMarker }) {
  const mapStyle =
    layer === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <MapContainer center={center} zoom={2} scrollWheelZoom className="map-container">
      <MapController center={center} />

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url={mapStyle}
      />

      {userLocation && (
        <Circle center={userLocation} radius={220} pathOptions={{ color: '#4cc9f0', fillColor: '#4cc9f0', fillOpacity: 0.2 }} />
      )}

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Sua localização atual</Popup>
        </Marker>
      )}

      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.coords}
          eventHandlers={{
            click: () => onSelectMarker(place),
          }}
        >
          <Popup>{place.name}</Popup>
        </Marker>
      ))}

      {routePoints.length > 1 && (
        <Polyline
          positions={routePoints}
          pathOptions={{ color: '#0ea5e9', weight: 5, opacity: 0.9 }}
        />
      )}

      {selectedPlace && (
        <Marker position={selectedPlace.coords}>
          <Popup>{selectedPlace.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
