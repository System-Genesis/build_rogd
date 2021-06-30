import menash from 'menashmq';
import config from './config';
import matchedRecordType from './types/matchedRecord';
import buildDI from './builds/buildDI';
import buildRole from './builds/buildRole';
import buildOG from './builds/buildOG';
import digitalIdentityObj from './types/digitalIdentity';
import roleObj from './types/role';
import organizationGroupObj from './types/organizationGroup';

const { rabbit } = config;

export default (record: matchedRecordType): void => {
    const identifier: string = (record.identityCard || record.personalNumber || record.goalUserId)!;
    const di: digitalIdentityObj = buildDI(record, identifier);
    const role: roleObj | null = record.hierarchy && di.isRoleAttachable ? buildRole(record, di.uniqueId) : null;
    const og: organizationGroupObj | null = role ? buildOG(record) : null;

    menash.send(rabbit.produceQueue, { di, role, og });
};
