const fs = require('fs');

const yaml = require('yamljs');
const Youtube = require('youtube-sdk');
const yt = new Youtube();

if (!process.env['YOUTUBE_KEY']) {
  throw new Error('no youtube key on environment');
}

yt.use(process.env['YOUTUBE_KEY']);

yt.get('playlistItems', {
  part: 'snippet',
  playlistId: 'UUs6Bu78-4JlWUfNX-J7AnSQ',
  type: 'video',
  maxResults: '50',
}, (err, data) => {
  const snippets = data.items.map(item => item.snippet);
  const results = yaml.stringify(snippets, 4);
  fs.writeFile('_data/videos.yml', results, (err, data) => {
    console.log('videos updated', data);
  });
});
