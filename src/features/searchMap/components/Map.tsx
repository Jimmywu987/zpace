import { compose, withProps } from "recompose";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { useDispatch, useSelector } from "react-redux";
import { locationSelector } from "@/redux/location";
import { markerSelector, toStoreMarkerIP } from "@/redux/marker";
import { useState } from "react";
import { settingSelector } from "@/redux/setting";
import { roomsSelector } from "@/redux/rooms";
import { toPlaceSelector } from "@/redux/toPlace";
import { toStoreRoomInfo, toStoreRoomSelector } from "@/redux/toStoreRoom";
import { Search } from "./Search";
import { Locate } from "./Locate";
import Link from "next/link";

const EXAMPLE_MAP_STYLES = [
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export const Map = () => {
  const dispatch = useDispatch();

  const { iP } = useSelector(locationSelector);
  const { selected } = useSelector(markerSelector);
  const [photoSequence, setPhotoSequence] = useState(0);
  const [markerState, setMarkerState] = useState([]);

  const { setting } = useSelector(settingSelector);
  const { rooms } = useSelector(roomsSelector);
  const { place } = useSelector(toPlaceSelector);
  const { chosenRoom } = useSelector(toStoreRoomSelector);
  const slidePhotoRight = () => {
    if (chosenRoom.chosenRoom.room.room_pictures.length - 1 > photoSequence) {
      setPhotoSequence((e: number) => e + 1);
    } else {
      setPhotoSequence((e: number) => (e = 0));
    }
  };
  const slidePhotoLeft = () => {
    if (0 < photoSequence) {
      setPhotoSequence((e: number) => e - 1);
    } else {
      setPhotoSequence(
        (e: number) => (e = chosenRoom.chosenRoom.room.room_pictures.length - 1)
      );
    }
  };
  const containerStyle = {
    width: "100%",
    height: "89vh",
  };

  return (
    <div className="relative">
      <div className="absolute bottom-1 left-2 z-50">
        <Locate />
      </div>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={{
            styles: EXAMPLE_MAP_STYLES,
          }}
          center={{ lat: iP.lat, lng: iP.lng }}
          zoom={iP.zoom}
        >
          {markerState.length > 0 &&
            markerState.map((e: any, index: number) => {
              return (
                <div key={index}>
                  <Marker
                    onClick={() => {
                      dispatch(toStoreRoomInfo({ chosenRoom: e } as any));
                      dispatch(
                        toStoreMarkerIP({
                          selected: {
                            lat: e.latitude,
                            lng: e.longitude,
                          },
                        })
                      );
                    }}
                    position={{
                      lat: parseFloat(e.latitude),
                      lng: parseFloat(e.longitude),
                    }}
                  />
                </div>
              );
            })}
          {selected.lat ? (
            <InfoWindow
              position={{
                lat: parseFloat(selected!.lat!.toString()),
                lng: parseFloat(selected!.lng!.toString()),
              }}
              onCloseClick={() => {
                dispatch(
                  toStoreMarkerIP({
                    selected: {
                      lat: null,
                      lng: null,
                    },
                  })
                );
              }}
            >
              <div className="preview_room_marker">
                <div className="img-box">
                  {chosenRoom.room.room_pictures.length > 1 && (
                    <i
                      onClick={slidePhotoLeft}
                      className="fas i-left fa-chevron-circle-left"
                    ></i>
                  )}
                  <img
                    src={
                      chosenRoom.room.room_pictures[photoSequence]
                        .picture_filename
                    }
                    alt="zpace-pic"
                  />
                  {chosenRoom.room.room_pictures.length > 1 && (
                    <i
                      onClick={slidePhotoRight}
                      className="fas i-right fa-chevron-circle-right"
                    ></i>
                  )}
                </div>
                <Link
                  href={`/room-detail/${chosenRoom.room.rooms_id}`}
                  passHref
                >
                  <a className="">{chosenRoom.room.space_name}</a>
                </Link>

                <p>Capacity: {chosenRoom.room.capacity}</p>
                <p>
                  ${chosenRoom.room.hourly_price.replace(/.0+$|0+$/, "")}
                  /hour
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
