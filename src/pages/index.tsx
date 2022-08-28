import { Card } from "@/features/common/components/Card";
import {
  LoadingSpinnerSvgIcon,
  LocationOnSvgIcon,
} from "@/features/common/components/svg/common";
import { loadingSelector } from "@/redux/loading";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Range } from "react-range";
import { DistrictListBox } from "@/features/common/components/DistrictListBox";

const HomePage: NextPage = (props) => {
  const [advanceSearch, showAdvanceSearch] = useState(false);
  const [content, setContent] = useState("");
  const [numPpl, setNumPpl] = useState("");

  const [pickedDate, setPickedDate] = useState<string>(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

  const [option, setOption] = useState("");

  const [range, setRange] = useState([20, 500]);
  const session = useSession();
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            <div className="flex flex-col items-center space-y-2">
              <button className="flex items-center justify-center space-x-3 border rounded p-2 hover:bg-gray-50 w-full">
                <LocationOnSvgIcon className="w-6 h-6 text-theme-color2" />
                <span className="text-lg">Search by current location</span>
              </button>
              <div>Or</div>
              <DistrictListBox setSelected={setOption} selected={option} />

              <form
                onSubmit={(event) => onSubmit(event)}
                className="w-full border rounded p-3 "
                noValidate
                autoComplete="off"
              >
                <input
                  className="w-full focus:outline-none text-gray-700"
                  placeholder="Location/Address"
                  type="text"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </form>
              <div className="text-gray-700">
                {`$${range[0]} HKD to $${range[1]} HKD`} / hour
              </div>
              <Range
                step={20}
                min={10}
                max={2000}
                values={range}
                onChange={(values) => setRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-0.5 bg-theme-color1/80 w-full rounded"
                    style={{
                      ...props.style,
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-2.5 w-2.5 bg-theme-color1 rounded-full"
                    style={{
                      ...props.style,
                    }}
                  />
                )}
              />
              <input
                className="w-full focus:outline-none p-3 border  rounded text-gray-700"
                placeholder="Number of visitors"
                type="text"
                value={numPpl}
                onChange={(event) => setNumPpl(event.target.value)}
              />
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
