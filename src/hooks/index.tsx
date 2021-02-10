import React from 'react';

import { AuthProvider } from './useAuth';
import { TrackBarProvider } from './useTrackBar';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <TrackBarProvider>{children}</TrackBarProvider>
  </AuthProvider>
);

export default AppProvider;
