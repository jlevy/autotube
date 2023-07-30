import { Box } from '@chakra-ui/react';

interface Props {
  name: string;
}

export default function Category(props: Props) {
  const { name } = props;

  return <Box>{name}</Box>;
}
