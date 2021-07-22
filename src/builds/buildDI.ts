import matchedRecordType from '../types/matchedRecord';
import fieldNames from '../config/fieldNames';
import cleanObj from '../utils/removeBlankAtt';
import digitalIdentityObj from '../types/digitalIdentity';

export default (record: matchedRecordType, identifier: string) => {
    const digitalIdentity: digitalIdentityObj = {
        type: record.source === fieldNames.sources.mir || record.source === fieldNames.sources.city ? 'kaki' : 'domUser',
        source: record.source,
        mail: record.mail,
        uniqueId: record.userID,
        entityId: identifier,
        isRoleAttachable: record.source !== fieldNames.sources.mir,
    };

    cleanObj(digitalIdentity);

    return digitalIdentity;
};
