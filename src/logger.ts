import logger from 'logger-genesis';
import config from './config/index';

export default async () => {
    await logger.initialize(config.systemName, config.serviceName, config.rabbit.uri, config.rabbit.logQueue, false, config.rabbit.retryOptions);
};
