import express from 'express';
import logger from 'morgan';

const app = express();
const port = process.env.PORT || 8000;

app.use(logger('dev'));

app.get('/api/whoiam', (req, res) => {
  const osArchPattern = /\((.+?)\)/g;
  const { ip } = req;
  const osArch = osArchPattern.exec(req.get('User-Agent'))[1];
  const lang = req.get('Accept-Language').split(';')[0].split(',')[0];

  return res.status(200).json({
    ipAddress: ip,
    'os/Architecture': osArch,
    language: lang,
  });
});

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ message: 'Error handling your request' });
  }

  return res.status(404).json({ message: 'Resource Not Found' });
});

app.listen(port, () => { console.log(`Server listening on ${port}`) });
