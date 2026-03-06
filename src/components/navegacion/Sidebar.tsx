import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navigation = [
  { name: "Overview", path: "/" },
  { name: "Adquisición", path: "/adquisicion" },
  { name: "Preprocesado", path: "/preprocesado" },
  { name: "Clasificación", path: "/clasificacion" },
  { name: "Predicción", path: "/prediccion" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-surface-1 border-r border-primaryDark flex flex-col">

      <div className="h-16 flex items-center px-6 border-b border-primaryDark">
        <span className="font-semibold text-text">
          Dashboard
        </span>
      </div>

      <nav className="flex flex-col gap-1 p-4 relative">

        {navigation.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div key={item.path} className="relative">

              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/90 rounded-lg shadow-sm shadow-black/30"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              )}

              <NavLink
                to={item.path}
                className={`
                  relative block py-2 rounded-lg text-sm
                  transition-colors duration-200
                  hover:bg-white/5
                  ${isActive
                    ? "px-5 font-semibold text-white"
                    : "px-4 text-text"}
                `}
              >
                {item.name}
              </NavLink>

            </div>
          );
        })}

      </nav>
    </aside>
  );
}