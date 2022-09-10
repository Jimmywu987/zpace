import React from "react";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useDispatch, useSelector } from "react-redux";

import { isLoading, loadingSelector } from "@/redux/loading";
import { LoadingSpinnerSvgIcon } from "@/features/common/components/svg/common";
import { toStorePlace } from "@/redux/toPlace";
import { toStoreIP } from "@/redux/location";

export const Locate = () => {
  const { loading } = useSelector(loadingSelector);

  const dispatch = useDispatch();

  return (
    <div className="bg-white flex justify-center items-center w-full">
      {loading ? (
        <LoadingSpinnerSvgIcon className="w-10 h-10" />
      ) : (
        <Button
          onClick={() => {
            dispatch(isLoading({ isLoading: true }));
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const addressJSON = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                );
                const address = await addressJSON.json();
                dispatch(toStorePlace({ place: address.results }));
                dispatch(
                  toStoreIP({
                    iP: {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                      zoom: 15,
                    },
                  })
                );

                dispatch(isLoading({ isLoading: false }));
              },
              () => null
            );
          }}
          className=""
          startIcon={
            <LocationOnIcon
              style={{ fontSize: 20 }}
              className="text-theme-color1"
            />
          }
        >
          Current Location
        </Button>
      )}
    </div>
  );
};
