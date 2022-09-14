import { Navbar } from "@/features/nav/Navbar";
import { Footer } from "@/features/footer";
import { useRouter } from "next/router";
const Layout = ({ children, initData }: any) => {
  const { route } = useRouter();

  return (
    <div>
      <Navbar />
      <main
        className={`min-h-[80vh] ${
          route !== "/search" && " container mx-auto "
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
