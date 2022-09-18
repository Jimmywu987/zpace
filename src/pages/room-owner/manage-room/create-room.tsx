import { CreateRoomForm } from "@/features/roomOwner/components/form/CreateRoomForm";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const CreateRoomPage = () => {
  return (
    <div className="my-6">
      <CreateRoomForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default CreateRoomPage;
