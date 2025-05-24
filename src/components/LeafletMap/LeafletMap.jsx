import React, { useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = () => {
  const [markers] = useState([
    { id: 1, lat: 51.505, lng: -0.09, name: "Marker 1" },
    { id: 2, lat: 51.515, lng: -0.1, name: "Marker 2" },
    { id: 3, lat: 51.525, lng: -0.11, name: "Marker 3" },
  ]);

  const handleMarkerClick = useCallback((id) => {
    console.log(`Marker clicked: ${id}`);
  }, []);

  return (
    <div className="map-container">
      <style>{`
        .map-container {
          height: 100vh; /* Full screen height */
          width: 100%; /* Full width */
          padding: 0;
          margin: 0;
        }

        .map {
          height: 100%; /* Full height for the map */
          width: 100%; /* Full width for the map */
          border: 2px solid #ccc; /* Optional border around the map */
        }
      `}</style>
      <MapContainer center={[51.505, -0.09]} zoom={13} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(marker.id),
            }}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
