import matchedRecordType from './types/matchedRecord';
import buildDI from './builds/buildDI';
import buildRole from './builds/buildRole';
import buildOG from './builds/buildOG';
import digitalIdentityObj from './types/digitalIdentity';
import roleObj from './types/role';
import organizationGroupObj from './types/organizationGroup';
import { sendToCreate } from './initializeRabbit';
import sendLog from './logger';

export default (record: matchedRecordType): void => {
    const identifier: string = (record.identityCard || record.personalNumber || record.goalUserId)!;
    const di: digitalIdentityObj = buildDI(record, identifier);
    const role: roleObj | null = record.hierarchy && di.isRoleAttachable ? buildRole(record, di.uniqueId) : null;
    const og: organizationGroupObj | null = role ? buildOG(record) : null;

    if (!role && !og) {
        sendLog('warn', `Role and OG didn't built`, false, {
            user: record.userID,
            identifier,
        });
    }

    sendToCreate(di, og, role);
};
