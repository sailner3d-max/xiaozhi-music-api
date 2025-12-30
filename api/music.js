export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { q = '周杰伦', keyword = '稻香' } = req.query;
  const query = q || keyword;

  const musicDatabase = [
    {
      id: '1',
      title: '稻香',
      artist: '周杰伦',
      url: 'https://music.163.com/song/media/outer/url?id=22974986.mp3',
      duration: '322',
      cover: 'https://p1.music.126.net/Ty_5Zty63bBLXJ0-8P5V3Q==/5639395138885805.jpg'
    },
    {
      id: '2',
      title: '青花瓷',
      artist: '周杰伦',
      url: 'https://music.163.com/song/media/outer/url?id=23026368.mp3',
      duration: '290',
      cover: 'https://p2.music.126.net/xJ5SRLK4KfOW7IpZXq-Gwg==/5633395138885805.jpg'
    },
    {
      id: '3',
      title: '说好不哭',
      artist: '五月天',
      url: 'https://music.163.com/song/media/outer/url?id=1431992104.mp3',
      duration: '300',
      cover: 'https://p1.music.126.net/qKL8rAJ5EhW5E3wWGzH6Uw==/109951165176810176.jpg'
    },
    {
      id: '4',
      title: 'Fade',
      artist: 'Alan Walker',
      url: 'https://music.163.com/song/media/outer/url?id=31953191.mp3',
      duration: '215',
      cover: 'https://p2.music.126.net/YpVY_E1XwePdGpvz4H_wMg==/7921868842185022.jpg'
    }
  ];

  let results = musicDatabase;
  if (query && query.length > 0) {
    const lowerQuery = query.toLowerCase();
    results = musicDatabase.filter(song =>
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery)
    );
  }

  if (results.length === 0) {
    results = [musicDatabase[Math.floor(Math.random() * musicDatabase.length)]];
  }

  const response = {
    code: 0,
    msg: 'ok',
    data: {
      list: results.map(song => ({
        id: song.id,
        name: song.title,
        artists: [{ name: song.artist }],
        duration: parseInt(song.duration) * 1000,
        url: song.url,
        pic: song.cover,
        album: song.artist
      })),
      total: results.length
    }
  };

  res.status(200).json(response);
};
