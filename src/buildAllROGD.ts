import menash from 'menashmq';
import config from './config';
import mergedObjType from './types/mergedObject';
import matchedRecordType from './types/matchedRecord';
import buildDI from './builds/buildDI';
import buildRole from './builds/buildRole';
import buildOG from './builds/buildOG';
import digitalIndentityObj from './types/digitalIndentity';
import roleObj from './types/role';
import organizationGroupObj from './types/organizationGroup';
import produceQueueObj from './types/produceQueueObj';

const { rabbit } = config;

const buildROGD = (matchedRecord: matchedRecordType, identidier: string): produceQueueObj => {

    const di: digitalIndentityObj = buildDI(matchedRecord, identidier);
    const role: roleObj = buildRole(matchedRecord, di.uniqeId);
    const og: organizationGroupObj = buildOG(matchedRecord);

    return {
        og,
        di,
        role
    }
}


export default async (mergedObj: mergedObjType): Promise<void> => {
    const identifier: string = mergedObj.identifiers.personalNumber || mergedObj.identifiers.identityCard || mergedObj.identifiers.goalUserId;
    for (const field in mergedObj) {
        if (field !== 'identifiers' ) {
            for (let i = 0; i < mergedObj[field].length; i++) {
                const objToSend: produceQueueObj = buildROGD(mergedObj[field][i].record, identifier);
                await menash.send(rabbit.produceQueue, objToSend);
            }
        }
    }
}