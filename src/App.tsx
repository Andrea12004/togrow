import { useEffect } from "react";
import type { ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { disconnectSocket } from "@/settings/socket";
import useAuth from "@/lib/hooks/useAuth";
import Login from "@/pages/login";
import SendReset from "@/pages/sendreset";
import Registro from "@/pages/registro";
import Reset from '@/pages/reset';
import Dashboard from './pages/dashboard';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  if (auth === null) return <Navigate to="/" />;
  return children;
};

function App() {
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (!auth) return;

    const handleDisconnect = () => {
      disconnectSocket();
    };

    window.addEventListener("beforeunload", handleDisconnect);

    return () => {
      window.removeEventListener("beforeunload", handleDisconnect);
      handleDisconnect();
    };
  }, [auth, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/enviar-restablecimiento" element={<SendReset />} />
      <Route path="/restablecer" element={<Reset />} />

      <Route path="/dashboard" element={<Dashboard />} />

      {/* Ruta no encontrada */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
