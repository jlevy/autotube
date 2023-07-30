import { colors } from '@/styles/utils/theme';
import { Box, Flex } from '@chakra-ui/react';

type Props = {
  name: string;
  children: React.ReactElement;
  [otherProps: string]: any;
};

export default function ColumnGroup(props: Props) {
  const { name, children, ...otherProps } = props;

  return (
    <Flex
      flex="1"
      direction="column"
      borderColor="boxBorder"
      borderWidth="2px"
      ml={1}
      mr={1}
      pb={1}
      {...otherProps}
    >
      <Box fontSize="sm" fontWeight="800" color={colors.boldText} textAlign="center" m={2}>
        {name}
      </Box>
      {children}
    </Flex>
  );
}
