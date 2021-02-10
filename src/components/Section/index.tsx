import React from 'react';
import { Animated } from 'react-native';
import { SubTitle, Title } from './styles';

interface ISectionProps {
  title: string;
  subtitle: string;
  timing: number;
}

const Section: React.FC<ISectionProps> = ({ title, subtitle }) => {
  return (
    <Animated.View>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Animated.View>
  );
};

export default Section;
