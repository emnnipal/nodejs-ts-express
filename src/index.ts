import app from './App';
import { logger } from './utils/logger';

const PORT = 3000;
const APP = 'development';

app.listen(PORT, () => {
  logger('APP', `Listening on PORT: ${PORT}, APP: ${APP}`);
});
