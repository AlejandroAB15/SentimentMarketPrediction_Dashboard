import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Adquisicion from "../pages/Adquisicion";
import Preprocesado from "../pages/Preprocesado";
import Clasificacion from "../pages/Clasificacion";
import Prediccion from "../pages/Prediccion";
import Overview from "../pages/Overview";

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Overview /> },
      { path: "/adquisicion", element: <Adquisicion /> },
      { path: "/preprocesado", element: <Preprocesado /> },
      { path: "/clasificacion", element: <Clasificacion /> },
      { path: "/prediccion", element: <Prediccion /> },
    ],
  },
]);