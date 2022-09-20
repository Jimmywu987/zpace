import React, { useState } from "react";
import { updateUserInfo } from "@/apis/api";

export default function ProfileEdit({ setIsEdit }: { setIsEdit: any }) {
  const [description, setDescription] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await updateUserInfo({
      description: description,
    });

    if (res && res.status === 201) {
      setIsEdit(false);
      return;
    }


  }
  return (
    <>

      <form onSubmit={handleSubmit}>
        <div>About</div>
        <textarea
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        >
          {description}
        </textarea>
        <br></br>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
