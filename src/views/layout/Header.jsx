import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/img/logo_horizontal.png';
import { Menu, X, User } from 'lucide-react';

const Header = ({open, toggleDrawer}) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="logo" width={150}/>
      </div>
      <button onClick={toggleDrawer} className="menu-button">
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>
      <div className='spacer'></div>
      <button className='header-button'>
        export
      </button>
      <div className='header-user'>
        <User size={25} />
      </div>
    </header>
  );
};

export default Header;