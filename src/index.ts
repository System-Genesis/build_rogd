/* eslint-disable no-console */
import menash, { ConsumerMessage } from 'menashmq';
import config from './config';

const { rabbit } = config;

require('dotenv').config();

export const initializeRabbit = async (): Promise<void> => {
    console.log('Trying connect to rabbit...');

    await menash.connect(rabbit.uri);
    await menash.declareQueue(rabbit.consumeQueue);
    await menash.declareQueue(rabbit.produceQueue);
    await menash.declareQueue(rabbit.logQueue);

    console.log('Rabbit connected');

    await menash.queue(rabbit.consumeQueue).activateConsumer(
        async (msg: ConsumerMessage) => {
            const obj: queueObject = msg.getContent() as queueObject;

            const matchedRecord: matchedRecordType = basicMatch(obj);

            await menash.send(rabbit.afterMatch, { record: matchedRecord, dataSource: obj.dataSource, runUID: obj.runUID });

            msg.ack();
        },
        { noAck: false },
    );
};nsole.log('Rabbit initialized');
};

const main = async () => {
    await initializeMongo();

    await initializeRabbit();

    const server = new Server(service.port);

    await server.start();

    console.log(`Server started on port: ${service.port}`);
};

main().catch((err) => console.error(err));
