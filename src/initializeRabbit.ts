/* eslint-disable no-console */
import menash, { ConsumerMessage } from 'menashmq';
import config from './config';
import matchedRecord from './types/matchedRecord';
import buildROGD from './buildROGD';
import { RODGObject } from './types/ROGDObject';

const { rabbit } = config;

/**
 * Connecting to Rabbit and declaring the queues
 */
export const initializeRabbit = async (): Promise<void> => {
    try {
        console.log('Trying connect to rabbit...');

        await menash.connect(rabbit.uri, rabbit.retryOptions);
        await menash.declareTopology({
            queues: [
                { name: rabbit.consumeNormalQueue, options: { durable: true } },
                { name: rabbit.consumeMirQueue, options: { durable: true } },
                { name: rabbit.produceNormalQueue, options: { durable: true } },
                { name: rabbit.produceMirQueue, options: { durable: true } },
            ],
        });

        console.log('Rabbit connected');
    } catch (err: any) {
        console.log('Rabbit Not initialized', err.message);
    }
};

/**
 * Activate the flow of the record and sends the return value to the queue.
 * Determine the flow by the record's source - different flow for Mir source
 */
export const consumeQueues = async (): Promise<void> => {
    // Normal flow
    await menash.queue(rabbit.consumeNormalQueue).activateConsumer(
        async (msg: ConsumerMessage) => {
            const record: matchedRecord = msg.getContent() as matchedRecord;
            const rogdObj: RODGObject = buildROGD(record);
            menash.send(rabbit.produceNormalQueue, rogdObj, { persistent: true });

            msg.ack();
        },
        { noAck: false },
    );

    // Mir source flow
    await menash.queue(rabbit.consumeMirQueue).activateConsumer(
        async (msg: ConsumerMessage) => {
            const record: matchedRecord = msg.getContent() as matchedRecord;

            // Sends array of identifiers instead of one.
            const identifiers = {
                personalNumber: record.personalNumber,
                identityCard: record.identityCard,
                goalUserId: record.goalUserId,
            };
            const rogdObj: RODGObject = buildROGD(record);
            menash.send(rabbit.produceMirQueue, { ...rogdObj, identifiers }, { persistent: true });
            msg.ack();
        },
        { noAck: false },
    );

    console.log('Rabbit initialized');
};
