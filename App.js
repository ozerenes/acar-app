import React from 'react';

import AppNavigator from "./appNavigator";

import { CountProvider, useCount } from './src/context/CountContext';




function App() {




    return (
        <CountProvider>
          <AppNavigator></AppNavigator>
        </CountProvider>
    );
}


export default App;
