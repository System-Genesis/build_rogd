import config from './config';
import menash, { ConsumerMessage } from 'menashmq';
import mergedObj from './types/mergedObject';
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
            const obj: mergedObj = msg.getContent() as mergedObj;
           
            
            
            buildAllROGD(obj);

            msg.ack();
        },
        { noAck: false }
    );

    console.log('Rabbit initialized');
};
