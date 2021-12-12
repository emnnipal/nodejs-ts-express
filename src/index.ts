import app from './App';
import { logger } from './utils/logger';

const PORT = 3000;
const APP = 'development';

app.listen(PORT, () => {
  logger(`Listening on PORT: ${PORT}, APP: ${APP}`);
});
