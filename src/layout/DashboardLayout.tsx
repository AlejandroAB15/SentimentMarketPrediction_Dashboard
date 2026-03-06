import { Outlet } from "react-router-dom";
import Sidebar from "../components/navegacion/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background text-text">

      <Sidebar />

      <main className="flex-1 flex flex-col bg-background">

        <header className="h-16 flex items-center px-8 border-b border-primaryDark bg-surface-1">
          <span className="text-sm text-text opacity-70">
          
          </span>
        </header>

        <section className="flex-1 p-8 bg-background">
          <Outlet />
        </section>

      </main>

    </div>
  );
}