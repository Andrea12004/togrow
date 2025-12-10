import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { AuthResponse } from '@/lib/types/layout';
import './css/sidebar.css'

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Simulación de datos del localStorage
  const authResponse: AuthResponse = {
    accessToken: 'mock-token',
    user: {
      role: 'ADMIN',
      lastPaymentDate: null,
      profile: ''
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    // Simulación de logout
    console.log('Logout realizado');
    navigate("/");
  };

  const goPagos = () => {
    navigate("/pagos");
  };

  return (
    <div className={`${isSidebarOpen ? 'sidebar' : 'sidebar-hidden'} ${authResponse.user.lastPaymentDate !== null ? '!justify-around' : ''}`}>
      {/* Movil */}
      <button className='activador-sidebar-movil' onClick={toggleSidebar}>
        <img src={`${isSidebarOpen ? '/svg/sidebar/collapse.svg' : '/svg/sidebar/menu.svg'}`} alt="Toggle sidebar" />
      </button>

      {/* HEADER */}
      <Link to="/dashboard" className='header-side'>
        <img src="/images/Logos/Logo-login.png" alt="Logo" className='img-header-side'/>
      </Link>

      {/* CONTENT */}
      <div className='content-side'>
        <Link to="/dashboard">
          <img src="/svg/sidebar/dashboard.svg" alt="Dashboard" />
          <img src="/svg/sidebar/dashboardhover.svg" alt="Dashboard hover" className='hover-side'/>
          Dashboard
        </Link>
        <Link to="/salas">
          <img src="/svg/sidebar/partidas.svg" alt="Partidas" />
          <img src="/svg/sidebar/partidashover.svg" alt="Partidas hover" className='hover-side'/>
          Partidas
        </Link>
        <Link to="/banco">
          <img src="/svg/sidebar/banco.svg" alt="Banco" />
          <img src="/svg/sidebar/bancohover.svg" alt="Banco hover" className='hover-side'/>
          Preguntas Y Categorias
        </Link>
        <Link to="/pagos">
          <img src="/svg/sidebar/pagos.svg" alt="Pagos" />
          <img src="/svg/sidebar/pagoshover.svg" alt="Pagos hover" className='hover-side'/>
          Pagos
        </Link>
        <Link to="/perfil">
          <img src="/svg/sidebar/perfil.svg" alt="Perfil" />
          <img src="/svg/sidebar/perfilhover.svg" alt="Perfil hover" className='hover-side'/>
          Perfil y ajustes
        </Link>
        <Link to="/usuarios">
          <img src="/svg/sidebar/usuarios.svg" alt="Usuarios" />
          <img src="/svg/sidebar/usuarioshover.svg" alt="Usuarios hover" className='hover-side'/>
          {authResponse.user.role === 'ADMIN' ? 'Usuarios' : 'Ranking'}
        </Link>
      </div>

      {/* UNLOCK */}
      {authResponse.user.lastPaymentDate === null && (
        <div className='unlock-div-side'>
          <img src="/svg/sidebar/unlock.svg" alt="Unlock" />
          <p>Desbloquear todos los beneficios</p>
          <button onClick={goPagos}>Desbloquear</button>
        </div>
      )}

      {/* LOGOUT */}
      <div className='logout-side'>
        <button onClick={logout}>
          <img src="/svg/sidebar/logout.svg" alt="Logout" />
          <img src="/svg/sidebar/logouthover.svg" alt="Logout hover" className='logout-hover'/>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;