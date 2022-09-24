import React, { SetStateAction, useState } from "react";
import { updateUserInfo } from "@/apis/api";


type ProfileEditProps = {
  setIsEdit: any
  description: string;
};

export default function ProfileEdit({ setIsEdit, description }: ProfileEditProps) {
  const [descriptionValue, setDescriptionValue] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await updateUserInfo({
      description: descriptionValue,
    });

    if (res && res.status === 201) {
      setIsEdit(false);
      return;
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <h1 className="font-bold">About</h1>
          <textarea
            name="description"
            defaultValue={description}
            onChange={(e) => setDescriptionValue(e.target.value)}
            className="my-5 p-2 border-black w-full rounded-md"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-white p-3 font-bold hover:bg-gray-200"
        >
          Save
        </button>
      </form>
    </>
  );
}
