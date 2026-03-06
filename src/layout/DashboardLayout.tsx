import { Outlet } from "react-router-dom";
import Sidebar from "../components/navegacion/Sidebar";
import Topbar from "../components/navegacion/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background text-text">

      <Sidebar />

      <main className="flex-1 flex flex-col bg-background">

        <Topbar />

        <section className="flex-1 p-8 bg-background">
          <Outlet />
        </section>

      </main>

    </div>
  );
}