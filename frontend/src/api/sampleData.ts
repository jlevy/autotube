export const channelData1 = {
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
          content: 'fame',
          timestamps: [
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
          ],
        },
        {
          content: 'programming',
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
        {
          content: 'TikTok',
          timestamps: [
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
          ],
        },
        {
          content: 'YouTube',
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
          content: 'love',
          timestamps: [
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
          ],
        },
        {
          content: 'fame',
          timestamps: [
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=7949s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
            'https://www.youtube.com/watch?v=Z3_PwvvfxIU&t=931s',
          ],
        },
        {
          content: 'money',
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

export const categorizedData1 = [
  { category: 'AI', videos: channelData1.videos },
  { category: 'Martial Arts', videos: channelData1.videos },
  { category: 'Programming', videos: channelData1.videos },
  { category: 'Politics', videos: channelData1.videos },
];

export const topicList1 = [
  'social media platforms',
  'consciousness',
  'love',
  'money',
  'fame',
  'chess',
  'programming',
  'political conflicts',
  'Ju Jiutsu',
  'MMA',
  'machine learning',
  'TikTok',
  'YouTube',
];

export type ChannelData = typeof channelData1;

export type VideoListData = typeof channelData1.videos;

export type CategorizedData = typeof categorizedData1;
