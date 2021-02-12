import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import { translate } from '../../locales';
import {
  AuthExplanation,
  BackDropContainer,
  Container,
  CoverContainer,
  GoodReadingText,
  HeaderContainer,
  HeaderImage,
  Title,
  UnderstandButton,
  UnderstandButtonText,
} from './styles';

interface ISpotifyAuthModalProps {
  isSpotifyAuthModalVisible: boolean;
  setIsSpotifyAuthModalVisible: (visible: boolean) => void;
}

const SpotifyAuthModal: React.FC<ISpotifyAuthModalProps> = ({
  setIsSpotifyAuthModalVisible,
  isSpotifyAuthModalVisible,
}) => {
  const handleModalClose = useCallback(async () => {
    await AsyncStorage.setItem('@SPOTIFY_AUTH', JSON.stringify(true));
    setIsSpotifyAuthModalVisible(false);
  }, [setIsSpotifyAuthModalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSpotifyAuthModalVisible}>
      <Container>
        <HeaderContainer />

        <BackDropContainer keyboardShouldPersistTaps={'always'}>
          <>
            <CoverContainer>
              <HeaderImage
                resizeMode="contain"
                source={require('../../assets/spotify_auth.png')}
              />
            </CoverContainer>

            <Title>{translate('spotify_modal.welcome')}</Title>
            <AuthExplanation>
              {translate('spotify_modal.explanation')}
            </AuthExplanation>
            <GoodReadingText>
              {translate('spotify_modal.good_reading')}
            </GoodReadingText>
            <UnderstandButton onPress={handleModalClose}>
              <UnderstandButtonText>
                {translate('spotify_modal.understand')}
              </UnderstandButtonText>
            </UnderstandButton>
          </>
        </BackDropContainer>
      </Container>
    </Modal>
  );
};

export default React.memo(SpotifyAuthModal);
