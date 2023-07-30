import React from 'react';
import { CategorizedData, ChannelData, topicList1 } from '@/api/sampleData';
import { colors, colorSchemes } from '@/styles/utils/theme';
import { simpleHashInt } from '@/utils/simpleHash';
import { Box, Flex, Grid, HStack } from '@chakra-ui/react';
import VideoList from './VideoList';

type Props = {
  categorizedData: CategorizedData;
};

const bgColors = Object.values(colorSchemes.background);

export const colorForTopic = (topic: string) => {
  const value = bgColors[Math.abs(simpleHashInt(topic)) % bgColors.length];
  return value;
};

export const topicPillLarge = (topic: string, key: any) => (
  <Box
    key={key}
    as="span"
    color={colors.labelText}
    fontWeight="700"
    mr="1.5em"
    px=".5em"
    py=".2em"
    bg={colorForTopic(topic)}
    borderRadius="md"
    my={2}
  >
    {topic}
  </Box>
);

export const topicPillSmall = (topic: string, key: any) => (
  <Box
    key={key}
    as="span"
    color={colors.labelText}
    fontWeight="700"
    px=".5em"
    py=".2em"
    fontSize="sm"
    bg={colorForTopic(topic)}
    borderRadius="md"
  >
    {topic}
  </Box>
);

export default function Overview(props: Props) {
  const { categorizedData } = props;

  return (
    <Box>
      <Box mb={16}>
        <Box
          textTransform="uppercase"
          color={colors.labelText}
          fontWeight="bold"
          mb={1}
          textAlign="center"
        >
          Topics Covered On This Channel
        </Box>
        <Box ml="10em">
          <Flex flexWrap="wrap" maxWidth="70em">
            {topicList1.map((topic, i) => topicPillLarge(topic, i))}
          </Flex>
        </Box>
      </Box>
      <Grid mt={16} templateColumns="repeat(auto-fill, minmax(30em, 1fr))" gap={2} overflowX="auto">
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
              <Box textAlign="center" p={5}>
                <VideoList videos={value.videos} />
              </Box>
            </Flex>
          );
        })}
      </Grid>
    </Box>
  );
}
