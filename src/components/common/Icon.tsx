import React from 'react';
import {Text, TextStyle} from 'react-native';

interface Props {
  name: string;
  style?: TextStyle;
}

// Material Symbols Outlined font-family; ensure link is in public/index.html
export const Icon: React.FC<Props> = ({name, style}) => {
  return (
    <Text
      style={[{fontFamily: 'Material Symbols Outlined', fontSize: 20}, style]}>
      {name}
    </Text>
  );
};

export default Icon;




