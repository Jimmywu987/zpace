import { SearchMapForm } from "@/features/searchMap/components/SearchMapForm";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

const HomePage: NextPage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <SearchMapForm />
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
