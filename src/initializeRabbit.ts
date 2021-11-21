/* eslint-disable no-console */
import menash, { ConsumerMessage } from 'menashmq';
import config from './config';
import matchedRecord from './types/matchedRecord';
import buildAllROGD from './buildROGD';
import digitalIdentityObj from './types/digitalIdentity';
import roleObj from './types/role';
import organizationGroupObj from './types/organizationGroup';

const { rabbit } = config;

export const initializeRabbit = async (): Promise<void> => {
    try {
        console.log('Trying connect to rabbit...');

        await menash.connect(rabbit.uri, rabbit.retryOptions);
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
    } catch (err: any) {
        console.log('Rabbit Not initialized', err.message);
    }
};

export const sendToCreate = (di: digitalIdentityObj, og: organizationGroupObj | null, role: roleObj | null): void => {
    menash.send(rabbit.produceQueue, { di, role, og });
};
