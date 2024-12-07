import { MapContainer, TileLayer, Marker,Popup, useMap } from 'react-leaflet'
import styles from './MapView.module.css';
import 'leaflet/dist/leaflet.css'
import { isAxiosError } from 'axios';

interface Props{
    data:DataDTO|null;
}

// Componente para mover el mapa cuando cambian las coordenadas
const MapUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
  
    // Actualizar la vista del mapa
    if (lat !== undefined && lng !== undefined) {
      map.setView([lat, lng], map.getZoom());
    }
  
    return null;
};

const MapView = ({data}:Props) =>{

    let lat = 0;
    let lng = 0;

    if(data && !isAxiosError(data)){
        lat = data!.location.lat;
        lng = data!.location.lng;
    }

    return (
        <MapContainer className={styles.map} center={[lat,lng]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat,lng]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <MapUpdater lat={lat} lng={lng} />
        </MapContainer>
    )
}

export default MapView