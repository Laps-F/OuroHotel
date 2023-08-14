import React from "react";
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';

import Modal from '../components/Modal';
import Details from '../components/Details';
import './MapPage.css';

const OPTIONAL = {
    position : 'fixed',
    top : '50%',
    left : '25%',
};


const MapPage = ({coords, hospedagens }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBMVYb8OYBVx1Xk16LG3aG2PINkAMD2zIA"
    })

    const [renderHotel, setRenderHotel] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showCard, setShowCard] = useState(false);

    const handleMarkerClick = (marker) => {
        hospedagens.map((item) => {
            if(marker.txt === item.Hotel){
                setRenderHotel(item);
            }
        })
        setShowCard(true); 
    };

    const handleInfoWindowClose = () => {
        setRenderHotel(null);
        setShowCard(false); 
    };

    function closeModal() {
        setShowCard(false);
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
                    {coords.map((place) => {
                        return (
                            <Marker key={place.txt} position={{lat: place.lat.doubleValue, lng: place.lng.doubleValue}} onMouseOver={(e) => {setSelectedMarker(place)}}
                            onClick={(e) => handleMarkerClick(place)}/>
                        )
                    })}
                    {selectedMarker && (
                        <InfoWindow
                            position={{lat: selectedMarker.lat.doubleValue, lng: selectedMarker.lng.doubleValue}}
                            onCloseClick={() => setSelectedMarker(null)}
                            options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
                            class-name="custom-info-window"
                        >
                            <div>
                                <h3 style={{ fontWeight: 'bold' }}>{selectedMarker.txt}</h3>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
                </>
            ) : <></>
        }
        {showCard ? 
            <Modal isOpen={showCard} OPTIONAL={OPTIONAL}>
                <Details
                    closeModal={closeModal}
                    hotel={renderHotel}
                />
            </Modal> : 
            <div></div>
        }
    </div>;
}

export default MapPage