/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import menash, { ConsumerMessage } from 'menashmq';
import config from './config';
import matchedRecord from './types/matchedRecord';
import buildAllROGD from './buildAllROGD';

const { rabbit } = config;

export const initializeRabbit = async (): Promise<void> => {
    console.log('Trying connect to rabbit...');

    await menash.connect(rabbit.uri);
    await menash.declareQueue(rabbit.consumeQueue);
    await menash.declareQueue(rabbit.produceQueue);
    await menash.declareQueue(rabbit.logQueue);

    console.log('Rabbit connected');

    await menash.queue(rabbit.consumeQueue).activateConsumer(
        async (msg: ConsumerMessage) => {
            const record: matchedRecord = msg.getContent() as matchedRecord;
            buildAllROGD(record);

            msg.ack();
        },
        { noAck: false },
    );

    console.log('Rabbit initialized');
};
