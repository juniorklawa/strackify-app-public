import moment from 'moment';
import React, { useCallback } from 'react';
import {
  Modal,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Slider } from 'react-native-elements';

import {
  PlayerState,
  SpotifyRemoteApi,
  remote,
} from 'react-native-spotify-remote';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ArtistName,
  BackDropContainer,
  Container,
  CoverContainer,
  GoBackButton,
  HeaderContainer,
  HeaderImage,
  HeaderSpacing,
  PlayingNowText,
  Title,
  TrackDuration,
  DurationContainer,
  ControlsContainer,
} from './styles';
import { useTrackBar } from '../../hooks/useTrackBar';
import { translate } from '../../locales';

interface TrackModalProps {
  isTrackModalVisible: boolean;
  setIsTrackModalVisible: (visible: boolean) => void;
  playerState: PlayerState | null;
  musicCover: string | undefined;
  handlePlayButton: () => void;
  playButtonText: string;
  remote: SpotifyRemoteApi;
}

const TrackModal: React.FC<TrackModalProps> = ({
  musicCover,
  playerState,
  handlePlayButton,
  setIsTrackModalVisible,
  isTrackModalVisible,
}) => {
  const { playButtonText } = useTrackBar();

  const truncateString = useCallback((str, num = 28) => {
    if (str && str.length <= num) {
      return str;
    }
    if (str) {
      return `${str.slice(0, num)}...`;
    }
  }, []);

  const getPercentual = useCallback(() => {
    return (playerState?.playbackPosition / playerState!.track.duration) * 100;
  }, [playerState]);

  const handleOnSeek = useCallback(
    async (e) => {
      await remote.seek((playerState!.track.duration * e) / 100);
    },
    [playerState],
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isTrackModalVisible}>
      <Container behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
        <HeaderContainer>
          <GoBackButton onPress={() => setIsTrackModalVisible(false)}>
            <Entypo name="chevron-thin-down" color="#fff" size={24} />
          </GoBackButton>

          <PlayingNowText>
            {translate('track_bar_modal.playing_now')}
          </PlayingNowText>

          <HeaderSpacing />
        </HeaderContainer>

        <BackDropContainer keyboardShouldPersistTaps={'always'}>
          <>
            <CoverContainer>
              <HeaderImage resizeMode="contain" source={{ uri: musicCover }} />
            </CoverContainer>

            <Title numberOfLines={1}>
              {truncateString(playerState?.track.name)}
            </Title>

            <ArtistName>{playerState?.track.artist.name}</ArtistName>
          </>

          <View>
            <Slider
              value={getPercentual()}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor="#40e0d0"
              allowTouchTrack={true}
              minimumTrackTintColor="#43cfc3"
              maximumTrackTintColor="#9E9E9E"
              thumbStyle={styles.thumbStyle}
              trackStyle={styles.trackStyle}
              onValueChange={async (e) => handleOnSeek(e)}
            />
            <DurationContainer>
              <TrackDuration>
                {`${moment.utc(playerState?.playbackPosition).format('mm:ss')}`}
              </TrackDuration>

              <TrackDuration>
                {`${moment.utc(playerState?.track.duration).format('mm:ss')}`}
              </TrackDuration>
            </DurationContainer>
          </View>

          <ControlsContainer>
            <TouchableOpacity onPress={() => remote.skipToPrevious()}>
              <Ionicons name="play-skip-back" color="#43cfc3" size={54} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePlayButton()}>
              <Ionicons
                name={
                  playButtonText === 'PLAY NOW' ? 'play-circle' : 'pause-circle'
                }
                color="#43cfc3"
                size={64}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => remote.skipToNext()}>
              <Ionicons name="play-skip-forward" color="#43cfc3" size={54} />
            </TouchableOpacity>
          </ControlsContainer>
        </BackDropContainer>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    height: 15,
    width: 15,
  },
  trackStyle: {
    height: 5,
  },
});

export default React.memo(TrackModal);
