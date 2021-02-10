import styled from 'styled-components/native';

interface IBookButtonProps {
  index: number;
}

export const ControlsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const MusicCoverImage = styled.Image`
  height: 60px;
  width: 60px;
`;

export const PlayButtonContainer = styled.View`
  margin-right: 16px;
`;

export const PlaylistControllerContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #212121;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TrackArtistText = styled.Text`
  font-family: OpenSans-Regular;
  color: #9e9e9e;
  font-size: 10px;
`;

export const TrackContainer = styled.View`
  flex-direction: row;
`;

export const TrackInfoContainer = styled.View`
  margin-left: 8px;
  margin-top: 8px;
`;

export const TrackNameText = styled.Text`
  font-family: OpenSans-Bold;
  color: #fff;
`;

export const TrackDurationText = styled.Text`
  font-family: OpenSans-Regular;
  color: #757575;
  font-size: 10px;
`;
