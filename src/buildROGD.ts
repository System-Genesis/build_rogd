import logger from 'logger-genesis';
import matchedRecordType from './types/matchedRecord';
import buildDI from './builds/buildDI';
import buildRole from './builds/buildRole';
import buildOG from './builds/buildOG';
import digitalIdentityObj from './types/digitalIdentity';
import roleObj from './types/role';
import organizationGroupObj from './types/organizationGroup';
import { RODGObject } from './types/ROGDObject';

/**
 * Builds all the ROGD objects.
 * Role and group my be null due to the record is from Mir source or doesn't have hierarchy. In that case sends a warning log
 * @param { matchedRecordType } record - The record got from the queue.
 * @return { RODGObject } - Object with digitalIdentity, role and group.
 */
export default (record: matchedRecordType): RODGObject => {
    const identifier: string = (record.identityCard || record.personalNumber || record.goalUserId || record.employeeId)!;
    const di: digitalIdentityObj = buildDI(record, identifier);
    const role: roleObj | null = record.hierarchy && di.isRoleAttachable ? buildRole(record) : null;
    const og: organizationGroupObj | null = role ? buildOG(record) : null;

    if (!role) logger.warn(false, 'APP', `Role and Group were not created`, `Role and Group were not created for DI ${di.uniqueId}`);

    return { di, og, role };
};
