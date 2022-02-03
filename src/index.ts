import initializeLogger from './logger';
import { consumeQueues, initializeRabbit } from './initializeRabbit';

require('dotenv').config();

/**
 * The main function.
 * Calls all the initializations
 */
const main = async () => {
    await initializeRabbit();
    await initializeLogger();
    await consumeQueues();
};

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err.message);
});
