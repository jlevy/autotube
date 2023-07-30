import { CreatableSelect } from 'chakra-react-select';
import { categorizedData1 } from '@/api/sampleData';
import Layout from '@/layout/components/Layout';
import VideoList from '@/overview/components/VideoList';
import Overview from '@/overview/Overview';
import { createSelectAutoCompleteStyle, noDropdownIndicator } from '@/styles/utils/theme';
import { Box, Button, Flex, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Layout>
      <FormControl>
        <FormLabel>Explore a YouTube Channel</FormLabel>
        <HStack mb={10}>
          <Flex flex="1" width="100%">
            <Box width="100%">
              <Input
                id="input"
                autoFocus={true}
                placeholder="Paste YouTube channel here..."
                // onChange={onChange}
                size="md"
                variant="outline"
              />
            </Box>
          </Flex>
          <Button
            size="md"
            pl={2}
            pr={2}
            mt={0}
            // onClick={handleButtonClick}
          >
            Go
          </Button>
        </HStack>
      </FormControl>
      <Overview categorizedData={categorizedData1} />
    </Layout>
  );
}
