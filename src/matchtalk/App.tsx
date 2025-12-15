import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute } from './types';
import { Onboarding } from './screens/Onboarding';
import { Login } from './screens/Auth';
import { Home } from './screens/Home';
import { Room } from './screens/Room';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={AppRoute.SPLASH} element={<Navigate to={AppRoute.ONBOARDING} replace />} />
        <Route path={AppRoute.ONBOARDING} element={<Onboarding />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        
        {/* Main App Routes */}
        <Route path={AppRoute.HOME} element={<Home />} />
        <Route path={AppRoute.ROOM} element={<Room />} />
        <Route path={AppRoute.PROFILE} element={<Profile />} />
        <Route path={AppRoute.SETTINGS} element={<Settings />} />
        
        {/* Fallbacks */}
        <Route path={AppRoute.NOTIFICATIONS} element={<Home />} />
        <Route path={AppRoute.CREATE_ROOM} element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;