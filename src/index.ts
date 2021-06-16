/* eslint-disable no-console */
import { initializeRabbit } from './initializeRabbit';

require('dotenv').config();

const main = async () => {
    await initializeRabbit();
};

main().catch((err) => console.error(err));
