import React from 'react';
import { Modal } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ItemContainer, ItemDescription, ItemImage, ItemTitle } from './styles';
import { translate } from '../../locales';

const slides = [
  {
    key: 1,
    title: 'Passo 1',
    text: translate('add_pl_tutorial.step_1'),
    image: require('../../assets/step_1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Passo 2',
    text: translate('add_pl_tutorial.step_2'),
    image: require('../../assets/step_2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Passo 3',
    text: translate('add_pl_tutorial.step_3'),
    image: require('../../assets/step_3.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Passo 4',
    text: translate('add_pl_tutorial.step_4'),
    image: require('../../assets/step_4.png'),
    backgroundColor: '#22bcb5',
  },
];

interface AddPlaylistTutorialProps {
  setIsPlaylistTutorialActive: (value: boolean) => void;
  isPlaylistTutorialActive: boolean;
}

interface StepProps {
  key: number;
  title: string;
  text: string;
  image: any;
  backgroundColor: string;
}

const AddPlaylistTutorial = ({
  setIsPlaylistTutorialActive,
  isPlaylistTutorialActive,
}: AddPlaylistTutorialProps) => {
  const _renderItem = ({ item }: { item: StepProps }) => {
    return (
      <ItemContainer>
        <ItemTitle>{translate('add_pl_tutorial.title')}</ItemTitle>
        <ItemImage resizeMode="contain" source={item.image} />
        <ItemDescription>{item.text}</ItemDescription>
      </ItemContainer>
    );
  };

  return (
    <Modal animationType="slide" visible={isPlaylistTutorialActive}>
      <AppIntroSlider
        renderItem={_renderItem}
        doneLabel={translate('add_pl_tutorial.done')}
        nextLabel={translate('add_pl_tutorial.next')}
        data={slides}
        onDone={() => setIsPlaylistTutorialActive(false)}
      />
    </Modal>
  );
};

export default AddPlaylistTutorial;
