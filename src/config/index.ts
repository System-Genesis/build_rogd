import * as env from 'env-var';
import './dotenv';

const config = {
    rabbit: {
        uri: env.get('RABBIT_URI').required().asUrlString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
        consumeNormalQueue: env.get('CONSUME_NORMAL_QUEUE').required().asString(),
        produceNormalQueue: env.get('PRODUCE_NORMAL_QUEUE').required().asString(),
        consumeMirQueue: env.get('CONSUME_MIR_QUEUE').required().asString(),
        produceMirQueue: env.get('PRODUCE_MIR_QUEUE').required().asString(),
        logQueue: env.get('LOG_QUEUE').required().asString(),
    },
    systemName: env.get('SYSTEM_NAME').required().asString(),
    serviceName: env.get('SERVICE_NAME').required().asString(),
    port: env.get('PORT').required().asInt(),
};

export default config;
