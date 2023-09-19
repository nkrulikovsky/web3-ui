import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import Pools from './pages/Pools';

export default function AppRouter() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path='pools' element={<Pools />} />
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
}
