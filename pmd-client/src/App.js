import Navbar from './components/partials/Navbar';
import Properties from './components/pages/Properties';
import Owners from './components/pages/Owners';
import AddProperty from './components/pages/AddProperty';
import AddOwner from './components/pages/AddOwner';
import SingleProp from './components/pages/SingleProp';
import Login from './components/pages/Login';
import AddTransaction from './components/partials/AddTransaction';
import './App.css';
import {useState, useEffect, createContext} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import TestFileUploader from './components/pages/TestFileUploader';

export const AppContext = createContext(null);

function App() {

  const [cardDisplay, setCardDisplay] = useState('cards');
  const [currProp, setCurrProp] = useState({});
  const [currPropId, setCurrPropId] = useState({});
  const [userId, setUserId] = useState('');

  return (
    <BrowserRouter>
      <AppContext.Provider value={{
         cardDisplay, setCardDisplay, 
         currProp, setCurrProp, 
         currPropId, setCurrPropId,
         userId, setUserId
            }}>
        <Navbar />
        <Routes>
          <Route path='/test' element={<TestFileUploader />} />
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Properties />} />
          <Route path='/owners' element={<Owners />} />
          <Route path='/add-prop' element={<AddProperty />} />
          <Route path='/add-owner' element={<AddOwner />} />
          <Route path='/show-prop' element={<SingleProp />} />
          <Route path='/add-trac' element={<AddTransaction />} />
        </Routes>
        </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
