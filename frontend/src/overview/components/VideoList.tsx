import { ChannelData, VideoListData } from '@/api/sampleData';
import { colors } from '@/styles/utils/theme';
import { Box, Link } from '@chakra-ui/react';
import BoxFrame from './BoxFrame';
import { colorForTopic, topicPillSmall } from './Overview';

const formatUrlTimestamp = (url: string) => {
  const urlParts = url.split('t=');
  const timestamp = urlParts[urlParts.length - 1];
  // Convert string like "7949s" to minutes and seconds:
  const minutes = Math.floor(parseInt(timestamp) / 60);
  const seconds = parseInt(timestamp) % 60;
  // Return formatted string with zero padding:
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

interface Props {
  videos: VideoListData;
}

export default function VideoList(props: Props) {
  const { videos } = props;

  return videos.map((video, i) => {
    return (
      <Box key={i} my={2}>
        <BoxFrame>
          <Box>
            <Link href={video.url}>{video.title}</Link>
          </Box>
          <Box>
            <i>Topics</i>:{' '}
            {video.topics.map((topic, i) => (
              <Box key={i}>
                {topicPillSmall(topic.content, i)} at{' '}
                {topic.timestamps.map((timestamp, i) => (
                  <Link key={i} href={timestamp}>
                    {formatUrlTimestamp(timestamp)}{' '}
                  </Link>
                ))}{' '}
              </Box>
            ))}
          </Box>
          <Box>
            <i>Discussed</i>:{' '}
            {video.takeaways.map((takeaway, i) => (
              <Box key={i}>
                <Box>
                  {takeaway.content} at{' '}
                  <Link href={takeaway.timestamp}>{formatUrlTimestamp(takeaway.timestamp)}</Link>
                </Box>
                <Box></Box>
              </Box>
            ))}
          </Box>
        </BoxFrame>
      </Box>
    );
  });
}
