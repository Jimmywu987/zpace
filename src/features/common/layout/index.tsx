import { Navbar } from "@/features/nav/Navbar";
import { Footer } from "@/features/footer";
import { useRouter } from "next/router";
import { LoadScriptMemo } from "@/features/searchMap/components/LoadScript";
const Layout = ({ children, initData }: any) => {
  const { route } = useRouter();
  const exclude_container_arr = ["/search"]
  return (
    <div className="w-full">
      <Navbar />
      <LoadScriptMemo>
        <main
          className={`min-h-[80vh] p-[10vh] ${
            exclude_container_arr.includes(route) && " container mx-auto "
          }`}
        >
          {children}
        </main>
      </LoadScriptMemo>
      <Footer />
    </div>
  );
};

export default Layout;
