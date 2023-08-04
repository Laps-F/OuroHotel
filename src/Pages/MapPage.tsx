import React from "react";
import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import './MapPage.css';


const MapPage = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBMVYb8OYBVx1Xk16LG3aG2PINkAMD2zIA"
    })

    const [renderHotel, setRenderHotel] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showCard, setShowCard] = useState(false);

    const handleMarkerClick = (marker) => {
        setRenderHotel(marker);
        setShowCard(true); 
        alert('Clicou!')
    };

    const handleInfoWindowClose = () => {
        setRenderHotel(null);
        setShowCard(false); 
    };

    const SolarDoRosario = {
        lat: -20.383660626169146, 
        lng: -43.50942981876866,
        text: "Solar do Rosário"
      }
    
    const GrandeHotel = {
        lat: -20.384226083530727, 
        lng: -43.50538888894446,
        text: "Grande Hotel de Ouro Preto"
      } 
    const SolarDaOpera = {
        lat: -20.385261656892418, 
        lng: -43.50458006196328,
        text: "Solar da Ópera"
      } 
    const BoroniPalace = {
        lat: -20.380175836474898, 
        lng: -43.507045288944454,
        text: "Boroni Palace"
      } 
    const ArcadiaMineira = {
        lat: -20.38833327388613,
        lng: -43.50289007545368,
        text: "Arcadia Mineira"
      } 
    return <div className="map">
        {
            isLoaded ? (
                <>
                <GoogleMap
                  mapContainerStyle={{width: '100%', height: '100%'}}
                  center={{
                    lat: -20.383251, 
                    lng: -43.502667
                  }}
                  zoom={15}
                >
                    <Marker position={{lat: SolarDoRosario.lat, lng: SolarDoRosario.lng}} onMouseOver={(e) => {setSelectedMarker(SolarDoRosario)}}
                    onClick={(e) => handleMarkerClick(SolarDoRosario)}
                    />
                    <Marker position={{lat: GrandeHotel.lat, lng: GrandeHotel.lng}} onMouseOver={(e) => {setSelectedMarker(GrandeHotel)}}
                    onClick={(e) => handleMarkerClick(GrandeHotel)}
                    />
                    <Marker position={{lat: SolarDaOpera.lat, lng: SolarDaOpera.lng}} onMouseOver={(e) => {setSelectedMarker(SolarDaOpera)}}
                    onClick={(e) => handleMarkerClick(SolarDaOpera)}
                    />
                    <Marker position={{lat: BoroniPalace.lat, lng: BoroniPalace.lng}} onMouseOver={(e) => {setSelectedMarker(BoroniPalace)}}
                    onClick={(e) => handleMarkerClick(BoroniPalace)}
                    />
                    <Marker position={{lat: ArcadiaMineira.lat, lng: ArcadiaMineira.lng}} onMouseOver={(e) => {setSelectedMarker(ArcadiaMineira)}}
                    onClick={(e) => handleMarkerClick(ArcadiaMineira)}
                    />
                    {selectedMarker && (
                        <InfoWindow
                            position={selectedMarker}
                            onCloseClick={() => setSelectedMarker(null)}
                            options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
                            class-name="custom-info-window"
                        >
                            <div>
                                <h3 style={{ fontWeight: 'bold' }}>{selectedMarker.text}</h3>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
                </>
            ) : <></>
        }
    </div>;
}

export default MapPage