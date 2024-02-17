import React from 'react';
import { EntityBox, StyledText } from '../styled/Entity.styled';

const Entity = ({ value, text }) => {
  return (
    <EntityBox>
        <StyledText>{value}</StyledText>
        <p>{text}</p>
    </EntityBox>
  );
};

export default Entity;
