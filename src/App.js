import './App.css';

import React, { useState } from 'react';
import CustomizableLayout from './components/CustomizableLayout';
import MainLayout from './views/layout';

const App = () => {
  return (
    <MainLayout>
      <CustomizableLayout/>
    </MainLayout>   
  )
};

export default App;