import menash, { ConsumerMessage } from 'menashmq';
import config from './config';
import matchedRecord from './types/matchedRecord';
import buildAllROGD from './buildROGD';
import digitalIdentityObj from './types/digitalIdentity';
import roleObj from './types/role';
import organizationGroupObj from './types/organizationGroup';
import sendLog from './logger';

const { rabbit } = config;

export const initializeRabbit = async (): Promise<void> => {
    try {
        sendLog('info', 'Trying connect to rabbit...', true);

        await menash.connect(rabbit.uri, rabbit.retryOptions);
        await menash.declareQueue(rabbit.consumeQueue);
        await menash.declareQueue(rabbit.produceQueue);
        await menash.declareQueue(rabbit.logQueue);

        sendLog('info', 'Rabbit connected', true);

        await menash.queue(rabbit.consumeQueue).activateConsumer(
            async (msg: ConsumerMessage) => {
                const record: matchedRecord = msg.getContent() as matchedRecord;
                buildAllROGD(record);

                msg.ack();
            },
            { noAck: false },
        );

        sendLog('info', 'Rabbit initialized', true);
    } catch (err) {
        sendLog('info', 'Rabbit initialized', true, { err });
    }
};

export const sendToCreate = (di: digitalIdentityObj, og: organizationGroupObj | null, role: roleObj | null): void => {
    sendLog('info', 'Sending ROGD to createRGBE', false, {
        user: di.uniqueId,
    });
    menash.send(rabbit.produceQueue, { di, role, og });
};
