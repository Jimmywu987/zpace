import { Card } from "@/features/common/components/Card";
import {
  LoadingSpinnerSvgIcon,
  LocationOnSvgIcon,
} from "@/features/common/components/svg/common";
import { isLoading, loadingSelector } from "@/redux/loading";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { DistrictListBox } from "@/features/common/components/DistrictListBox";
import Slider from "@mui/material/Slider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SelectCalendar } from "@/features/common/components/SelectCalendar";
import { useRouter } from "next/router";
import { toSet } from "@/redux/setting";
import { toStorePlace } from "@/redux/toPlace";
import { toStoreIP } from "@/redux/location";

const HomePage: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const [advanceSearch, showAdvanceSearch] = useState(false);
  const [content, setContent] = useState("");
  const [numPpl, setNumPpl] = useState("");
  const [pickedDate, setPickedDate] = useState<string>(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

  const [option, setOption] = useState("");

  const [range, setRange] = useState<number[]>([20, 500]);

  const { loading } = useSelector(loadingSelector);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(isLoading({ isLoading: true }));
    router.push("/search");
    dispatch(isLoading({ isLoading: false }));
  };
  const onClickCurrentLocation = () => {
    dispatch(isLoading({ isLoading: true }));
    dispatch(
      toSet({
        setting: { ppl: Number(numPpl), priceRg: range, date: pickedDate },
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
  };
  const onChangeSubmit = async () => {
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
  };

  return (
    <div className="flex justify-center items-center">
      <Card>
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
                className="border flex items-center justify-center space-x-3 rounded p-3 hover:bg-gray-50 w-full"
                disabled={loading}
                onClick={onClickCurrentLocation}
              >
                <LocationOnSvgIcon className="w-6 h-6 text-theme-color2" />
                <span className="text-lg">Search by current location</span>
              </button>
              <div>Or</div>
              <DistrictListBox setSelected={setOption} selected={option} />
              <hr className="w-full" />
              <button
                className="bg-theme-color1 text-white py-2 rounded hover:bg-theme-color1/90 shadow-xl w-full"
                disabled={loading}
                onClick={onChangeSubmit}
              >
                SEARCH ROOM
              </button>
              <hr className="w-full" />

              <button
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
              </button>
              <div
                className={`flex flex-col w-full space-y-3 ${
                  !advanceSearch && "hidden"
                }`}
              >
                <form
                  onSubmit={(event) => onSubmit(event)}
                  className="w-full border rounded"
                  noValidate
                  autoComplete="off"
                >
                  <input
                    className="w-full focus:outline-none p-3 border  rounded text-gray-700"
                    placeholder="Location / Address"
                    type="text"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </form>
                <div className="text-gray-700">
                  {`$${range[0]} HKD to $${range[1]} HKD`} / hour
                </div>
                <Slider
                  min={10}
                  max={2000}
                  value={range}
                  step={20}
                  className="text-theme-color1"
                  onChange={(_, newValue) => setRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={(value) => value.toString()}
                />
                <input
                  className="w-full focus:outline-none p-3 border  rounded text-gray-700"
                  placeholder="Number of visitors"
                  type="text"
                  value={numPpl}
                  onChange={(event) => setNumPpl(event.target.value)}
                />
                <SelectCalendar setPickedDate={setPickedDate} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HomePage;

export async function getServerSideProps(context: any) {
  // Get external data from the file system, API, DB, etc.
  const data = { name: "jimmy" };

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: data,
  };
}
