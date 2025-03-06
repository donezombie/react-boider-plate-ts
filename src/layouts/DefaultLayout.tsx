import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  return (
    <div className="component:DefaultLayout flex min-h-[100vh]">
      <Sidebar />

      <div className="layout-wrapper w-full p-3 md:w-[calc(100%-var(--sidebar-width))] md:pl-10">
        <Navbar />
        <main className="flex w-full">{props.children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
