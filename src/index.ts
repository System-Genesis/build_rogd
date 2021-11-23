import logger from 'logger-genesis';
import { initializeRabbit } from './initializeRabbit';

require('dotenv').config();

const main = async () => {
    await initializeRabbit();
};

main().catch((err) => {
    logger.error(false, 'SYSTEM', 'Unknown error', err.message);
});
