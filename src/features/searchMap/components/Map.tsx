import { LoadScriptMemo } from "@/features/searchMap/components/LoadScript";
import { locationSelector } from "@/redux/location";
import { markerSelector } from "@/redux/marker";
import { roomsSelector } from "@/redux/rooms";
import { settingSelector } from "@/redux/setting";
import { toPlaceSelector } from "@/redux/toPlace";
import { toStoreRoomInfo, toStoreRoomSelector } from "@/redux/toStoreRoom";
import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RoomType } from "@/types/Room";
import { InfoWindowCard } from "./InfoWindowCard";
import { Locate } from "./Locate";

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

export const Map = ({ availableRooms }: { availableRooms: RoomType[] }) => {
  const dispatch = useDispatch();

  const { iP } = useSelector(locationSelector);
  const { selected } = useSelector(markerSelector);
  const [openWindow, setOpenWindow] = useState(true);
  const { setting } = useSelector(settingSelector);
  const { rooms } = useSelector(roomsSelector);
  const { place } = useSelector(toPlaceSelector);
  const { chosenRoom } = useSelector(toStoreRoomSelector);

  const containerStyle = {
    width: "100%",
    height: "89vh",
  };

  return (
    <div className="relative">
      <div className="absolute bottom-1 left-2 z-50">
        <Locate />
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{
          styles: EXAMPLE_MAP_STYLES,
        }}
        center={!openWindow ? undefined : { lat: iP.lat, lng: iP.lng }}
        zoom={iP.zoom}
      >
        {availableRooms.map((room: RoomType) => (
          <Marker
            key={room.id}
            onClick={() => {
              dispatch(toStoreRoomInfo({ chosenRoom: room }));
              setOpenWindow(true);
            }}
            position={{
              lat: parseFloat(room.latitude),
              lng: parseFloat(room.longitude),
            }}
          >
            {room.id === chosenRoom?.id ? (
              <InfoWindowF
                position={{
                  lat: parseFloat(room.latitude),
                  lng: parseFloat(room.longitude),
                }}
                onCloseClick={() => {
                  dispatch(toStoreRoomInfo({ chosenRoom: undefined }));
                  setOpenWindow(false);
                }}
              >
                <InfoWindowCard chosenRoom={room} />
              </InfoWindowF>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};
