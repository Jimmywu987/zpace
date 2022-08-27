import { Card } from "@/features/common/components/Card";
import type { NextPage } from "next";
import { useSession, getSession } from "next-auth/react";

const HomePage: NextPage = (props) => {
  const session = useSession();

  return (
    <div className="flex justify-center items-center">
      <Card>
        <div className="flex flex-col space-y-3 w-full">
          <h5 className="text-theme-color1 text-center text-lg font-semibold">
            Search for a Working Space Instantly
          </h5>
          <hr />
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
