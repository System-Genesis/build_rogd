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
// import * as fs from 'fs';

const { rabbit } = config;

const buildROGD = (matchedRecord: matchedRecordType, identifier: string): produceQueueObj => {

    const di: digitalIdentityObj = buildDI(matchedRecord, identifier);
    const role: roleObj = buildRole(matchedRecord, di.uniqueId);
    const og: organizationGroupObj | null = matchedRecord.hierarchy ? buildOG(matchedRecord) : null;

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
                console.log(objToSend);
                // fs.appendFileSync('a.json',JSON.stringify(objToSend))
                // fs.appendFileSync('a.json',',')
                await menash.send(rabbit.produceQueue, objToSend);
            }
        }
    }
}