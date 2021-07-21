import { initializeRabbit } from './initializeRabbit';
import sendLog from './logger';

require('dotenv').config();

const main = async () => {
    await initializeRabbit();
};

main().catch((err) => sendLog('error', 'Unknown message', true, { msg: err.message }));
