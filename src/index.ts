import createServer from './App';
import { APP, NODE_ENV, PORT } from './shared/configs/app';
import logger from './shared/utils/Logger';

const app = createServer();

app.listen(PORT, () => {
  logger.info(`Listening on PORT: ${PORT}, APP: ${APP} NODE_ENV: ${NODE_ENV}`);
});
