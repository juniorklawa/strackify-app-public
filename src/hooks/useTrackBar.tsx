import React, { createContext, useContext, useState } from 'react';
import { PlayerState } from 'react-native-spotify-remote';
import { ISpotifyPlayList } from '../pages/AddPlaylist';

interface ITrackBarContextData {
  setCurrentPlayerState: (state: PlayerState) => void;
  currentPlayerState: PlayerState | null;
  hasPlayerAction: boolean;
  setHasPlayerAction: (hasAction: boolean) => void;
  currentPlaylist: ISpotifyPlayList | null;
  setCurrentPlaylist: (playlist: ISpotifyPlayList | null) => void;
  setIsActive: (isActive: boolean) => void;
  isActive: boolean;
  playButtonText: string;
  setPlayButtonText: (text: string) => void;
}

const TrackBarContext = createContext<ITrackBarContextData>(
  {} as ITrackBarContextData,
);

const TrackBarProvider: React.FC = ({ children }) => {
  const [
    currentPlayerState,
    setCurrentPlayerState,
  ] = useState<PlayerState | null>(null);

  const [hasPlayerAction, setHasPlayerAction] = useState<boolean>(false);

  const [
    currentPlaylist,
    setCurrentPlaylist,
  ] = useState<ISpotifyPlayList | null>(null);

  const [playButtonText, setPlayButtonText] = useState<string>('PLAY NOW');

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <TrackBarContext.Provider
      value={{
        isActive,
        setIsActive,
        currentPlaylist,
        setCurrentPlaylist,
        setCurrentPlayerState,
        currentPlayerState,
        hasPlayerAction,
        setHasPlayerAction,
        playButtonText,
        setPlayButtonText,
      }}>
      {children}
    </TrackBarContext.Provider>
  );
};

function useTrackBar(): ITrackBarContextData {
  const context = useContext(TrackBarContext);
  if (!context) {
    throw new Error('useTrackBar must be used within an Component');
  }

  return context;
}

export { TrackBarProvider, useTrackBar };
