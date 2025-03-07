import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/providers/AuthenticationProvider";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { loadingUser } = useAuth();

  return (
    <div className="component:DefaultLayout flex min-h-[100vh]">
      <Sidebar />

      <div className="layout-wrapper w-full p-3 md:w-[calc(100%-var(--sidebar-width))] md:pl-10">
        {loadingUser ? null : <Navbar />}
        <main className="flex w-full">
          {loadingUser ? <Loading /> : props.children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
