import styled from 'styled-components/native';

interface IBookButtonProps {
  index: number;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f2f2f2;
`;

export const TrackTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;

export const PlaylistDuration = styled.Text`
  margin-left: 8px;
  font-size: 11px;
  margin-top: 4px;
  color: #616161;
  font-family: OpenSans-Regular;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const HeaderContent = styled.View``;

export const TopPlaylistControllerContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TopPlayButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: -32px;
`;

export const FavoriteButton = styled.TouchableOpacity`
  margin-left: 8px;
`;

export const Separator = styled.View`
  height: 3px;
  width: 100%;
  background-color: #bdbdbd50;
  margin-top: 16px;
  border-radius: 5px;
`;

export const BookScrollView = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const BookButton = styled.TouchableOpacity<IBookButtonProps>`
  width: 120px;
  margin-horizontal: 12px;
  margin-left: ${({ index }) => (index === 0 ? '20' : '0')}px;
`;

export const TracksSectionTitle = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 24px;
  color: #1b1a24;
`;

export const BookCover = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 8px;
`;

export const BooksSectionTitle = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 24px;
  margin-left: 16px;
  color: #1b1a24;
  margin-bottom: 16px;
`;

export const TopPlayButtonText = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 14px;
  color: #1b1a24;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #ffffff;
  width: 70%;
  padding: 8px;
  text-align: center;
  font-family: OpenSans-Bold;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #eeeeee;
  text-align: center;
  font-family: OpenSans-Regular;
`;

export const CardContainer = styled.TouchableOpacity`
  width: 180px;
  min-height: 150px;
  background-color: #282828;
  border-radius: 2px;
  margin: 8px;
`;

export const CategoryImage = styled.Image`
  width: 100%;
  height: 80px;
  justify-content: flex-start;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const DeletePlaylistButton = styled.TouchableOpacity`
  margin-right: 16px;
`;

export const CategoryDescription = styled.Text`
  color: #aeaeae;
  font-size: 12px;
  font-family: OpenSans-Regular;
`;

export const RecommendedTitle = styled.Text`
  margin-top: 4px;
  color: #bdbdbd;
  font-size: 12px;
  font-family: OpenSans-SemiBold;
`;

export const CategoryTitle = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: OpenSans-Bold;
`;

export const TextContainer = styled.View`
  padding: 8px;
`;

export const RecommendedContainer = styled.View`
  padding-horizontal: 8px;
`;
export const ModalContainer = styled.View`
  min-height: 350px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalTitle = styled.Text`
  font-family: OpenSans-Bold;
  color: #ffffff;
  font-size: 24px;
`;

export const ModalDescription = styled.Text`
  font-family: 'OpenSans-Bold';
  color: #ffffff;
  font-size: 12px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #121212;
`;

export const PlaylistMusic = styled.TouchableOpacity`
  width: 100%;
  margin-vertical: 4px;
  padding-vertical: 8px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
`;

export const BookTitle = styled.Text`
  color: #1b1a24;
  margin-top: 8px;
  font-family: OpenSans-Bold;
  font-size: 13px;
  flex-wrap: wrap;
`;

export const BookAuthor = styled.Text`
  color: #9e9e9e;
  font-family: OpenSans-Regular;
`;

export const MusicTitle = styled.Text`
  color: #1b1a24;
  font-family: OpenSans-Bold;
  flex-wrap: wrap;
`;

export const MusicLength = styled.Text`
  color: #9e9e9e;
  font-family: OpenSans-Regular;
`;

export const PlaylistCover = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 8px;
`;

export const MusicCover = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

export const ContentContainer = styled.View`
  margin-left: 16px;
  width: 100%;
  flex: 1;
`;

export const BarContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const PlaylistButton = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  border-radius: 25px;
  background-color: #e59500;
  justify-content: center;
  align-items: center;
`;

export const ContainerPlaylistButton = styled.View`
  justify-content: center;
  margin-top: 16px;
  align-items: center;
  flex-direction: row;
`;

export const PlaylistButtonText = styled.Text`
  font-size: 16px;
  font-family: OpenSans-Bold;
  color: #ffffff;
`;

export const TrackListContainer = styled.View`
  padding-horizontal: 24px;
  margin-bottom: 24px;
  background-color: #f2f2f2;
`;

export const PlaylistControllerContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #212121;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TrackContainer = styled.View`
  flex-direction: row;
`;

export const MusicCoverImage = styled.Image`
  height: 60px;
  width: 60px;
`;

export const TrackInfoContainer = styled.View`
  margin-left: 8px;
  margin-top: 8px;
`;

export const TrackNameText = styled.Text`
  font-family: OpenSans-Bold;
  color: #fff;
`;

export const TrackArtistText = styled.Text`
  font-family: OpenSans-Regular;
  color: #9e9e9e;
  font-size: 10px;
`;

export const TrackDurationText = styled.Text`
  font-family: OpenSans-Regular;
  color: #757575;
  font-size: 10px;
`;

export const PlayButtonContainer = styled.View`
  margin-right: 16px;
`;

export const PlaylistDescriptionContainer = styled.View``;

export const PlaylistTitle = styled.Text`
  font-family: OpenSans-ExtraBold;
  font-size: 18px;
  color: #1b1a24;
`;

export const PlaylistLength = styled.Text`
  font-family: OpenSans-Regular;
  font-size: 14px;
  color: #757575;
`;

export const PlaylistFavorites = styled.Text`
  font-family: OpenSans-Light;
  font-size: 13px;
  color: #757575;
`;


export const PlaylistLengthBold = styled.Text`
  font-family: OpenSans-Regular;
  font-size: 14px;
  color: #757575;
`;

export const SpotifyButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
export const SpotifyButtonText = styled.Text`
  color: #424242;
  font-size: 12px;
  margin-left: 4px;
  font-family: OpenSans-Bold;
`;

export const ControlsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CirclePlayButton = styled.View`
  background-color: #43cfc3;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 32px;
`;

export const PlaylistInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

export const TitleSpacing = styled.View`
  margin-right: 16px;
`;

export const PlaylistDescription = styled.Text`
  margin-top: 12px;
  margin-left: 4px;
  color: #616161;
  font-family: OpenSans-Regular;
`;
