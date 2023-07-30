import { Box, Link } from '@chakra-ui/react';

interface Props {}

export default function Sidebar(props: Props) {
  return (
    <Box>
      <Box mt={8} mb={4}>
        <Link href="/">{/* <Logo /> */}</Link>
      </Box>
      {/* Sidebar content */}
    </Box>
  );
}
