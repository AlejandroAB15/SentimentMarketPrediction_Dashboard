import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Download,
  Filter,
  Brain,
  TrendingUp,
} from "lucide-react";

const navigation = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Adquisición", path: "/adquisicion", icon: Download },
  { name: "Preprocesado", path: "/preprocesado", icon: Filter },
  { name: "Clasificación", path: "/clasificacion", icon: Brain },
  { name: "Predicción", path: "/prediccion", icon: TrendingUp },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-surface-1 border-r border-primaryDark flex flex-col">

      <div className="h-20 flex items-center gap-3 px-4 border-b border-primaryDark">
        <img
          src="/favicon.svg"
          className="w-7 h-7"
        />

        <span className="text-sm font-semibold text-text/90">
          Pipeline de Análisis
        </span>
      </div>

      <nav className="flex flex-col gap-1 px-4 pt-6 pb-4 relative">

        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <div key={item.path} className="relative">

              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  initial={false}
                  className="absolute inset-0 bg-primary/90 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              <NavLink to={item.path} className="block relative">
                <motion.div
                  animate={{
                    paddingLeft: isActive ? 20 : 16,
                    paddingRight: isActive ? 20 : 16,
                  }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`
                    flex items-center gap-3 py-2.5 rounded-lg text-sm
                    transition-colors duration-300 select-none cursor-pointer
                    hover:bg-white/5
                    ${isActive ? "font-semibold text-white" : "font-medium text-text"}
                  `}>
                  <Icon
                    size={19}
                    strokeWidth={1.7}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-white" : "text-text/70"
                    }`}
                  />
                  <span>{item.name}</span>
                </motion.div>
              </NavLink>

            </div>
          );
        })}
      </nav>
    </aside>
  );
}