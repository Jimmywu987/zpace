import { Card } from "@/features/common/components/Card";
import {
  LoadingSpinnerSvgIcon,
  LocationOnSvgIcon,
} from "@/features/common/components/svg/common";
import { loadingSelector } from "@/redux/loading";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Range } from "react-range";
const HomePage: NextPage = (props) => {
  const [advanceSearch, showAdvanceSearch] = useState(false);
  const [range, setRange] = useState([20, 30]);
  const session = useSession();
  const dispatch = useDispatch();
  const { loading } = useSelector(loadingSelector);
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
              {/* experimenting the range */}
              <Range
                step={1}
                min={0}
                max={100}
                values={range}
                onChange={(values) => setRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#ccc",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-2 w-2 bg-gray-800 "
                    style={{
                      ...props.style,
                    }}
                  />
                )}
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
