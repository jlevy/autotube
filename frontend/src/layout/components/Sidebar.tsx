import { Box, Img, Link } from '@chakra-ui/react';

interface Props {}

export default function Sidebar(props: Props) {
  return (
    <Box>
      <Box mt={8} mb={4}>
        <Link href="/">
          <b>
            <Img w="6em" src="images/autotube.jpg" />
          </b>
        </Link>
      </Box>
      Explore the best of your favorite YouTube channels
    </Box>
  );
}
