import matchedRecordType from '../types/matchedRecord';
import fieldNames from '../config/fieldNames';
import digitalIdentityObj from '../types/digitalIdentity';

export default (record: matchedRecordType, identifier: string): digitalIdentityObj => {
    const digitalIdentity: digitalIdentityObj = {
        type: record.source === fieldNames.sources.mir ? 'kaki' : 'domUser',
        source: record.source,
        uniqueId: record.userID,
        entityId: identifier,
        isRoleAttachable: record.source !== fieldNames.sources.mir,
    };

    if (record.mail) digitalIdentity.mail = record.mail;

    return digitalIdentity;
};
