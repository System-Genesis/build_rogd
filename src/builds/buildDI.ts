import matchedRecordType from '../types/matchedRecord';
import fieldNames from '../config/fieldNames';
import digitalIdentityObj from '../types/digitalIdentity';

/**
 * Creates the digitalIdentity object.
 * @param { matchedRecordType } record - The record got from the queue.
 * @param { string } identifier - One of the identifiers of the entity this record belongs to.
 * @return { digitalIdentityObj } - The digitalIdentity object.
 */
export default (record: matchedRecordType, identifier: string): digitalIdentityObj => {
    const digitalIdentity: digitalIdentityObj = {
        // digitalIdentity from Mir source is a virtualUser
        type: record.source === fieldNames.sources.mir ? 'virtualUser' : 'domainUser',
        source: record.source,
        uniqueId: record.userID,
        entityId: identifier,
        isRoleAttachable: record.source !== fieldNames.sources.mir,
    };

    // Mail is not required
    if (record.mail) digitalIdentity.mail = record.mail;

    return digitalIdentity;
};
