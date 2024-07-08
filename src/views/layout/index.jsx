import React, { useState } from 'react';

import './index.css';
import { Box, CssBaseline, Container, Grid, Button } from '@mui/material';
import Header from './Header';
import MainDrawer from './MainDrawer';
import Footer from './Footer';
import { Menu, X, User } from 'lucide-react';
import logo from '../../assets/img/logo.png';
const Layout = ({children}) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // return (
    // <Box sx={{ display: 'flex' }}>
    //   <CssBaseline />
    //   <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
    //   <MainDrawer open={open} handleDrawerClose={handleDrawerClose}/>
    //   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    //       <Grid container spacing={3}>
    //         {children}
    //       </Grid>
    //     </Container>
    //   </Box>
    //   <Footer />
    // </Box>
    // import React, { useState } from 'react';


  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="root-layout">
      {/* Header */}
      <Header open={isDrawerOpen} toggleDrawer={toggleDrawer} />

       {/* Drawer */}
      <aside className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><a href="#">Basic Layout</a></li>
            <li><a href="#">Main Components</a></li>
          </ul>
        </nav>
      </aside>
      
      <div className="content-wrapper">
        {/* Main Content */}
        <main className={`main-content ${isDrawerOpen ? 'shifted' : ''}`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Layout;
