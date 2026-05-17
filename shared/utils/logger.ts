import pino from 'pino';
import { appEnv } from './env';

const logger = pino({
    level: appEnv.NODE_ENV === 'production' ? 'info' : 'debug',
});

export default logger;
