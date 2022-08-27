import { Navbar } from "@/features/nav/Navbar";
import { Footer } from "@/features/footer";
const Layout = ({ children, initData }: any) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-[80vh] container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
