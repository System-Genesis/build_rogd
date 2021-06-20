/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import menash from 'menashmq';
import config from './config';
import mergedObjType from './types/mergedObject';
import matchedRecordType from './types/matchedRecord';
import buildDI from './builds/buildDI';
import buildRole from './builds/buildRole';
import buildOG from './builds/buildOG';
import digitalIdentityObj from './types/digitalIdentity';
import roleObj from './types/role';
import organizationGroupObj from './types/organizationGroup';
import produceQueueObj from './types/produceQueueObj';

const { rabbit } = config;

const buildROGD = (matchedRecord: matchedRecordType, identifier: string): produceQueueObj => {
    const di: digitalIdentityObj = buildDI(matchedRecord, identifier);
    const role: roleObj | null = matchedRecord.hierarchy && di.isRoleAttachable ? buildRole(matchedRecord, di.uniqueId) : null;
    const og: organizationGroupObj | null = role ? buildOG(matchedRecord) : null;

    return {
        og,
        di,
        role,
    };
};

export default async (mergedObj: mergedObjType): Promise<void> => {
    const identifier: string = mergedObj.identifiers.identityCard || mergedObj.identifiers.personalNumber || mergedObj.identifiers.goalUserId;
    for (const field in mergedObj) {
        if (field !== 'identifiers') {
            for (let i = 0; i < mergedObj[field].length; i++) {
                const objToSend: produceQueueObj = buildROGD(mergedObj[field][i].record, identifier);
                await menash.send(rabbit.produceQueue, objToSend);
            }
        }
    }
};
