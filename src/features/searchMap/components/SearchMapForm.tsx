import { Card } from "@/features/common/components/Card";
import { DistrictListBox } from "@/features/common/components/DistrictListBox";
import {
  LoadingSpinnerSvgIcon,
  LocationOnSvgIcon,
} from "@/features/common/components/svg/common";
import { AdvancedSearchInput } from "@/features/searchMap/components/AdvanceSearchInput";
import { useSearchMapFormResolver } from "@/features/searchMap/schemas/useSearchMapFormResolver";
import { SearchMapInputTypes } from "@/features/searchMap/types/searchMapInputTypes";
import { isLoading, loadingSelector } from "@/redux/loading";
import { toStoreIP } from "@/redux/location";
import { toSet } from "@/redux/setting";
import { toStorePlace } from "@/redux/toPlace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const SearchMapForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);
  const currentDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  const searchMapFormMethods = useForm<SearchMapInputTypes>({
    resolver: useSearchMapFormResolver(),
    defaultValues: {
      content: "",
      numPpl: 0,
      range: [20, 500],
      pickedDate: currentDate,
    },
  });
  const [advanceSearch, showAdvanceSearch] = useState(false);

  const onClickCurrentLocation = searchMapFormMethods.handleSubmit(
    async (data) => {
      const { numPpl, range, pickedDate } = data;
      dispatch(isLoading({ isLoading: true }));
      dispatch(
        toSet({
          setting: { ppl: numPpl, priceRg: range, date: pickedDate },
        })
      );
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          const addressJSON = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          );
          const address = await addressJSON.json();
          dispatch(toStorePlace({ place: address.results }));
          dispatch(
            toStoreIP({
              iP: {
                lat,
                lng,
                zoom: 15,
              },
            })
          );
          dispatch(isLoading({ isLoading: false }));

          router.push("/search");
        },
        () => null
      );
    }
  );

  const onSubmit = searchMapFormMethods.handleSubmit(async (data) => {
    const { numPpl, range, pickedDate, content } = data;
    dispatch(isLoading({ isLoading: true }));
    dispatch(
      toSet({
        setting: { ppl: Number(numPpl), priceRg: range, date: pickedDate },
      })
    );
    const latAndLngJSON = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${content}+Hong+Kong&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const latAndLng = await latAndLngJSON.json();
    if (latAndLng.results[0]) {
      let lat = latAndLng.results[0].geometry.location.lat || null;
      let lng = latAndLng.results[0].geometry.location.lng || null;
      const addressJSON = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const address = await addressJSON.json();
      dispatch(toStorePlace({ place: address.results }));
      dispatch(
        toStoreIP({
          iP: {
            lat,
            lng,
            zoom: 15,
          },
        })
      );
      dispatch(isLoading({ isLoading: false }));
      router.push("/search");
    }
  });

  return (
    <Card>
      <FormProvider {...searchMapFormMethods}>
        <div className="flex flex-col space-y-3 w-full">
          <h5 className="text-theme-color1 text-center text-lg font-semibold">
            Search for a Working Space Instantly
          </h5>
          <hr />
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinnerSvgIcon className="w-10 h-10" />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <button
                className=" hover:bg-gray-50 w-full"
                disabled={loading}
                onClick={onClickCurrentLocation}
              >
                <div className=" h-full w-full border p-3 flex items-center justify-center space-x-3 border-gray-300 rounded">
                  <LocationOnSvgIcon className="w-6 h-6 text-theme-color2" />
                  <span className="text-lg">Search by current location</span>
                </div>
              </button>
              <div>Or</div>
              <DistrictListBox />
              <hr className="w-full" />
              <button
                className="bg-theme-color1 text-white py-2 rounded hover:bg-theme-color1/90 shadow-xl w-full"
                disabled={loading}
                onClick={onSubmit}
              >
                SEARCH ROOM
              </button>
              <hr className="w-full" />
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => showAdvanceSearch((show: boolean) => !show)}
              >
                <SearchIcon />
                <span className="text-lg">Advanced Search</span>
                <ExpandMoreIcon
                  className={`text-theme-color1 transition duration-150 ${
                    advanceSearch && "-rotate-180"
                  }`}
                />
              </div>
              {advanceSearch && <AdvancedSearchInput />}
            </div>
          )}
        </div>
      </FormProvider>
    </Card>
  );
};
