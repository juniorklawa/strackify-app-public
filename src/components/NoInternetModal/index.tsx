import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Description,
  ModalCenterContainer,
  ModalContainer,
  ModalView,
  Title,
} from './styles';

const NoInternetModal: React.FC = () => {
  const [isNotConnected, setIsNotConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsNotConnected(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ModalContainer>
      <Modal animationType="slide" transparent={true} visible={isNotConnected}>
        <ModalCenterContainer>
          <ModalView>
            <Title>Ops!</Title>
            <Icon name="wifi-off" color="#40e0d0" size={80} />
            <Description>
              Parece que você está sem internet! que tal verificar sua conexão?
            </Description>
          </ModalView>
        </ModalCenterContainer>
      </Modal>
    </ModalContainer>
  );
};

export default NoInternetModal;
