import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { remote } from 'react-native-spotify-remote';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTrackBar } from '../../hooks/useTrackBar';
import TrackModal from '../TrackModal';
import {
  ControlsContainer,
  MusicCoverImage,
  PlayButtonContainer,
  PlaylistControllerContainer,
  TrackArtistText,
  TrackContainer,
  TrackDurationText,
  TrackInfoContainer,
  TrackNameText,
} from './styles';
import { translate } from '../../locales';

const TrackBar: React.FC = () => {
  const {
    setIsActive,
    isActive,
    setCurrentPlayerState,
    currentPlayerState,
    currentPlaylist,
    playButtonText,
    setPlayButtonText,
    hasPlayerAction,
  } = useTrackBar();

  const [isTrackModalVisible, setIsTrackModalVisible] = useState<boolean>(
    false,
  );

  const truncateString = useCallback((str, num = 28) => {
    if (str && str.length <= num) {
      return str;
    }
    if (str) {
      return `${str.slice(0, num)}...`;
    }
  }, []);

  const handleShuffling = useCallback(async () => {
    const isShuffling = currentPlayerState?.playbackOptions.isShuffling;
    Toast.show(
      `${translate('track_bar.random_mode')} ${
        isShuffling
          ? translate('track_bar.disabled')
          : translate('track_bar.active')
      }`,
    );

    remote.setShuffling(!isShuffling);
  }, [currentPlayerState]);

  const getMusicCover = useCallback(
    (albumUri: string) => {
      const data = currentPlaylist?.tracks.items.find(
        (i) => i.track.album.uri === albumUri,
      );
      return data?.track.album.images[0].url;
    },
    [currentPlaylist],
  );

  const handlePlayButton = useCallback(async () => {
    setIsActive(!isActive);
    const playerState = await remote.getPlayerState();

    if (!playerState.isPaused) {
      setPlayButtonText('PLAY NOW');
      await remote.pause();
      return;
    }
    setPlayButtonText('PAUSE');
    await remote.resume();

    const playerStateUpdated = await remote.getPlayerState();
    setCurrentPlayerState(playerStateUpdated);
  }, [isActive, setCurrentPlayerState, setIsActive, setPlayButtonText]);

  if (!currentPlayerState || !hasPlayerAction) {
    return null;
  }

  return (
    <>
      <PlaylistControllerContainer
        activeOpacity={1.0}
        onPress={() => setIsTrackModalVisible(true)}>
        <TrackContainer>
          <MusicCoverImage
            source={{
              uri: getMusicCover(currentPlayerState!.track.album.uri),
            }}
          />
          <TrackInfoContainer>
            <TrackNameText>
              {truncateString(currentPlayerState!.track.name)}
            </TrackNameText>
            <TrackArtistText>
              {currentPlayerState!.track.artist.name}
            </TrackArtistText>
            <TrackDurationText>
              {`${moment
                .utc(currentPlayerState!.playbackPosition)
                .format('mm:ss')}/${moment
                .utc(currentPlayerState!.track.duration)
                .format('mm:ss')}`}
            </TrackDurationText>
          </TrackInfoContainer>
        </TrackContainer>
        <ControlsContainer>
          <PlayButtonContainer>
            <TouchableOpacity onPress={async () => await handleShuffling()}>
              <Icon
                name={'shuffle'}
                size={22}
                color={
                  currentPlayerState!.playbackOptions.isShuffling
                    ? '#43CFC3'
                    : '#fff'
                }
              />
            </TouchableOpacity>
          </PlayButtonContainer>
          <PlayButtonContainer>
            <TouchableOpacity onPress={async () => await handlePlayButton()}>
              <Icon
                name={playButtonText === 'PLAY NOW' ? 'play' : 'pause'}
                size={32}
                color="#43CFC3"
              />
            </TouchableOpacity>
          </PlayButtonContainer>
        </ControlsContainer>
      </PlaylistControllerContainer>

      <TrackModal
        isTrackModalVisible={isTrackModalVisible}
        setIsTrackModalVisible={setIsTrackModalVisible}
        playerState={currentPlayerState}
        playButtonText={playButtonText}
        musicCover={getMusicCover(currentPlayerState!.track.album.uri)}
        handlePlayButton={handlePlayButton}
        remote={remote}
      />
    </>
  );
};

export default TrackBar;
