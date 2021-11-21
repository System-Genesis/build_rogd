import logger from 'logger-genesis';
import { initializeRabbit } from './initializeRabbit';

require('dotenv').config();

const main = async () => {
    await initializeRabbit();
};

main().catch((err) => {
    logger.logError(false, 'Unknown error', 'SYSTEM', err.message);
});
