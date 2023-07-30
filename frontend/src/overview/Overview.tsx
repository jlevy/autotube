import React from 'react';
import { CategorizedData, ChannelData } from '@/api/sampleData';
import { colors } from '@/styles/utils/theme';
import { Box, Flex, Grid, HStack } from '@chakra-ui/react';
import VideoList from './components/VideoList';

type Props = {
  categorizedData: CategorizedData;
};

export default function Overview(props: Props) {
  const { categorizedData } = props;

  return (
    <Grid mt={6} templateColumns="repeat(auto-fill, minmax(30em, 1fr))" gap={2} overflowX="auto">
      {categorizedData.map((value, i) => {
        return (
          <Flex
            key={i}
            flex="1"
            direction="column"
            borderColor="boxBorder"
            borderWidth="2px"
            ml={1}
            mr={1}
            pb={1}
          >
            <Box fontSize="lg" fontWeight="800" color={colors.boldText} textAlign="center" m={2}>
              {value.category}
            </Box>
            <Box p={5}>
              <VideoList videos={value.videos} />
            </Box>
          </Flex>
        );
      })}
    </Grid>
  );
}
