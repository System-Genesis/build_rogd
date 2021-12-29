/* eslint-disable no-console */
import menash, { ConsumerMessage } from 'menashmq';
import config from './config';
import matchedRecord from './types/matchedRecord';
import buildAllROGD from './buildROGD';
import { queueObject } from './types/queueObject';

const { rabbit } = config;

const consumeByQueue = (msg: ConsumerMessage, produceQueueName: string): void => {
    const record: matchedRecord = msg.getContent() as matchedRecord;
    const rogdObj: queueObject = buildAllROGD(record);
    menash.send(produceQueueName, rogdObj);
};

export const initializeRabbit = async (): Promise<void> => {
    try {
        console.log('Trying connect to rabbit...');

        await menash.connect(rabbit.uri, rabbit.retryOptions);
        await menash.declareQueue(rabbit.consumeNormalQueue);
        await menash.declareQueue(rabbit.consumeMirQueue);
        await menash.declareQueue(rabbit.produceNormalQueue);
        await menash.declareQueue(rabbit.produceMirQueue);

        console.log('Rabbit connected');
    } catch (err: any) {
        console.log('Rabbit Not initialized', err.message);
    }
};

export const consumeQueues = async () => {
    await menash.queue(rabbit.consumeNormalQueue).activateConsumer(
        async (msg: ConsumerMessage) => {
            consumeByQueue(msg, rabbit.produceNormalQueue);
            msg.ack();
        },
        { noAck: false },
    );

    await menash.queue(rabbit.consumeMirQueue).activateConsumer(
        async (msg: ConsumerMessage) => {
            consumeByQueue(msg, rabbit.produceMirQueue);
            msg.ack();
        },
        { noAck: false },
    );

    console.log('Rabbit initialized');
};
