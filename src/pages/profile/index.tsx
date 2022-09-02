import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();


export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    select: {
      username:true,
      id:true,
    }
  })
  if (!users) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users,
    }
  };
}

export default function Page({users} : {users : User[]}) {

  console.log(users);
  return (
    <main>
      <pre>{users?.map(user => JSON.stringify(user, null, 2))}</pre>
    </main>
  )
}

type User = {
  id: string,
  username: string,
}