import Sidebar from "@/src/components/layout/SideBar";
import Navbar from "@/src/components/NavBar";
import { ToastProvider } from "@/src/components/ToastContext";

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <div className="drawer lg:drawer-open">
        {/* Drawer toggle */}
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" defaultChecked />

        {/* Main content */}
        <div className="drawer-content">
          <Navbar />
          <main className="flex-1 mx-auto p-8">
            <ToastProvider>
              {children}
            </ToastProvider>
          </main>
        </div>

        {/* Modularized Sidebar */}
        <Sidebar />
      </div>
      {/* <Footer /> */}
    </>
  );
}
