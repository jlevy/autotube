import { Box, Link } from '@chakra-ui/react';
import BoxFrame from './BoxFrame';

const sampleData = {
  channel_id: 'https://www.youtube.com/@lexfridman',
  categories: ['AI', 'MMA', 'Continuousness', 'Love', 'Money', 'Fame', 'Power'],
  videos: [
    {
      title:
        'MrBeast: Future of YouTube, Twitter, TikTok, and Instagram | Lex Fridman Podcast #351',
      description: 'A description of this',
      url: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU',
      category: '',
      topics: [
        {
          content: 'social media platforms',
          timestamps: [
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
          ],
        },
      ],
      takeaways: [
        {
          content: 'MrBeast talks about Twitter',
          timestamp: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
        },
        {
          content: 'MrBeast talks about TikTok',
          timestamp: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=3188s',
        },
      ],
    },
    {
      title:
        'MrBeast: Future of YouTube, Twitter, TikTok, and Instagram | Lex Fridman Podcast #351',
      description: 'A description of this',
      url: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU',
      category: '',
      topics: [
        {
          content: 'social media platforms',
          timestamps: [
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
          ],
        },
      ],
      takeaways: [
        {
          content: 'MrBeast talks about Twitter',
          timestamp: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
        },
        {
          content: 'MrBeast talks about TikTok',
          timestamp: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=3188s',
        },
      ],
    },
    {
      title:
        'MrBeast: Future of YouTube, Twitter, TikTok, and Instagram | Lex Fridman Podcast #351',
      description: 'A description of this',
      url: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU',
      category: '',
      topics: [
        {
          content: 'social media platforms',
          timestamps: [
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
          ],
        },
      ],
      takeaways: [
        {
          content: 'MrBeast talks about Twitter',
          timestamp: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
        },
        {
          content: 'MrBeast talks about TikTok',
          timestamp: 'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=3188s',
        },
      ],
    },
  ],
};

const formatUrlTimestamp = (url: string) => {
  const urlParts = url.split('t=');
  const timestamp = urlParts[urlParts.length - 1];
  // Convert string like "7949s" to minutes and seconds:
  const minutes = Math.floor(parseInt(timestamp) / 60);
  const seconds = parseInt(timestamp) % 60;
  // Return formatted string with zero padding:
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

interface Props {}

export default function VideoList(props: Props) {
  // const { data } = props;

  const data = sampleData;

  return data.videos.map((video, i) => {
    return (
      <Box key={i} my={2}>
        <BoxFrame>
          <Box>
            <Link href={video.url}>{video.title}</Link>
          </Box>
          <Box>
            <i>Topics</i>:{' '}
            {video.topics.map((topic, i) => (
              <Box as="span" key={i}>
                {topic.content} at{' '}
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
