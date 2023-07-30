import * as React from 'react';
import { borders, colors } from '@/styles/utils/theme';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export default function BoxFrame(props: Props) {
  const { children } = props;

  const hover = { bgColor: 'bgHighlight', cursor: 'pointer' };
  const focus = { bgColor: 'bgHighlight', borderColor: 'dimFocus' };

  return (
    <Box
      // ref={controls.focusRef}
      // onFocus={controls.onFocus}
      // onClick={controls.onClick}
      // onMouseEnter={controls.onMouseEnter}
      // onMouseLeave={controls.onMouseLeave}
      // onDoubleClick={controls.onDoubleClick} // This is a bit annoying.
      w="500px"
      minWidth={10}
      border={borders.boxSolid}
      borderRadius="0"
      shadow="sm"
      // borderColor={borderColor}
      className="text-container"
      position="relative"
      bgColor={colors.bgBox}
      _hover={hover}
      _focus={focus}
      // Without this, the blue browser focus ring will override our custom focus style:
      _focusVisible={{ outline: 'none' }}
      px={3}
      py={2}
      transition="background-color 0.2s, border-color 0.2s"
    >
      {children}
    </Box>
  );
}
