import styled from 'styled-components/native';

interface CenterContainerProps {
  height: number;
}

interface BottomSheetCircleProps {
  color: string;
}

interface SelectedCategoryCircleProps {
  color: string;
}

export const InputContainer = styled.TextInput`
  margin-top: 24px;
  color: #000;
  font-size: 28px;
  width: 100%;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  text-align: center;
  font-family: OpenSans-Regular;
  padding: 6px;
`;

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  background-color: #f2f2f2;
`;

export const SearchBarContainer = styled.View`
  background-color: #fff;
  margin-horizontal: 24px;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  height: 50px;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  border-color: #43cfc3;
  border-width: 1.5px;
  border-radius: 10px;
  flex-direction: row;
  padding-horizontal: 8px;
`;

export const SelectedCategoryCircle = styled.View<SelectedCategoryCircleProps>`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`;

export const SearchBookInput = styled.TextInput`
  color: #212121;
  margin-left: 8px;
  flex: 1;
`;

export const GoBackButton = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const CenterContainer = styled.View<CenterContainerProps>`
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height - 160}px;
  flex: 1;
`;

export const BookResultsScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f2f2f2;
`;

export const PastePlaylistContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Title = styled.Text`
  color: #000;
  font-size: 24px;
  font-family: OpenSans-Regular;
`;

export const EmptyList = styled.Text`
  color: #000;
  font-size: 12px;
  font-family: OpenSans-Regular;
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

export const LoadPlaylistButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: #43cfc3;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  border-radius: 5px;
`;

export const LoadPlaylistText = styled.Text`
  font-family: OpenSans-Regular;
  color: #1fada2;
  font-size: 16px;
`;

export const SectionTitle = styled.Text`
  color: #424242;
  font-size: 22px;
  font-family: OpenSans-Bold;
  margin-top: 22px;
`;

export const SectionInput = styled.TextInput`
  color: #fff;
  margin-top: 4px;
  min-height: 40px;
  background-color: #212121;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 16px;
  font-family: OpenSans-Regular;
  padding: 16px;
`;

export const CategoryText = styled.Text`
  color: #fff;
  font-family: OpenSans-Regular;
  font-size: 16px;
`;

export const SelectedCategoryLabel = styled.Text`
  color: #fff;
  font-family: OpenSans-Regular;
  font-size: 16px;
  margin-left: 8px;
`;

export const SelectedCategoryImage = styled.Image`
  height: 24px;
  width: 24px;
`;

export const SelectedCategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionDescription = styled.Text`
  color: #000;
  margin-top: 4px;
  font-size: 14px;
  text-align: left;
  font-family: OpenSans-Regular;
`;

export const PlaylistCover = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 5px;
`;

export const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const PlaylistMusic = styled.View`
  width: 100%;
  background-color: #212121;
  margin-vertical: 8px;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
`;

export const BookResultButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #212121;
  margin-vertical: 8px;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
`;

export const AddBookButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #212121;
  margin-vertical: 12px;
  padding: 4px;
  height: 60px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
`;

export const MusicTitle = styled.Text`
  color: #ffffff;
  font-family: OpenSans-Regular;
  flex-wrap: wrap;
`;

export const MusicLength = styled.Text`
  color: #757575;
  font-family: OpenSans-Regular;
`;

export const ScrollViewContainer = styled.View`
  margin-horizontal: 16px;
`;

export const SearchBookImage = styled.Image`
  width: 100%;
  height: 512px;
`;

export const ContentContainer = styled.View`
  margin-left: 16px;
  width: 100%;
  flex: 1;
`;

export const MusicCover = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

export const CategoryGrid = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
`;

export const CategoryBottomSheetButton = styled.TouchableOpacity`
  flex-basis: 30%;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const NextButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #43cfc3;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  border-radius: 5px;
`;

export const BottomSheetImage = styled.Image`
  height: 24px;
  width: 24px;
`;

export const BottomSheetCircle = styled.View<BottomSheetCircleProps>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`;

export const BottomSheetLabel = styled.Text`
  font-size: 14px;
  padding-top: 10px;
  color: #333;
`;

export const NextButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: OpenSans-Bold;
`;

export const CategoryButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: #212121;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin-top: 12px;
  flex-direction: row;
  padding-horizontal: 16px;
`;

export const SelectedBookContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #212121;
  margin-vertical: 8px;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
`;

export const BookCover = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

export const BookContentContainer = styled.View`
  margin-left: 16px;
  width: 100%;
  flex: 1;
`;

export const BookTitle = styled.Text`
  color: #ffffff;
  font-family: OpenSans-Regular;
  flex-wrap: wrap;
`;

export const BookAuthor = styled.Text`
  color: #757575;
  font-family: OpenSans-Regular;
`;
