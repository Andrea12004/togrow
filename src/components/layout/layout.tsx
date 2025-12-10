import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './css/style.css';
import './css/sidebar.css';
import './css/header.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className='all-dashboard'>
      <Sidebar />
      
      <div className='content-dashboard'>
        <Header setSearchQuery={setSearchQuery} />

        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;