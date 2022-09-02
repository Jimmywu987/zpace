import { User } from "@/types/User";
import { useSession } from "next-auth/react";

export default function EditUserPhoto({}) {
  const session = useSession();
  const user = session.data?.user as User;
  return (
    <main>
      <p></p>
      This is edit user photo page
    </main>
  );
}
