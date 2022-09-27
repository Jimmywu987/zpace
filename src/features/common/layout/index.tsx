import { Navbar } from "@/features/nav/Navbar";
import { Footer } from "@/features/footer";
import { useRouter } from "next/router";
const Layout = ({ children, initData }: any) => {
  const { route } = useRouter();
  const exclude_container_arr = ["/search","/chats"]
  return (
    <div className=" w-full">
      <Navbar />
      <main
        className={`min-h-[80vh] pt-[9.5vh] ${
          !exclude_container_arr.includes(route) && " container mx-auto "
        } 
      `}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
