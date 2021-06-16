import matchedRecordType from '../types/matchedRecord';
import fieldNames from '../config/fieldNames';
import cleanObj from '../utils/removeBlankAtt';
import digitalIdentityObj from '../types/digitalIdentity';
import assembleUniqueID from '../utils/assembleUniqueID';

export default (record: matchedRecordType, identifier: string) => {
    const digitalIdentity: digitalIdentityObj = {
        type: record.source === fieldNames.sources.mir ? 'digUser' : 'domUser',
        source: record.source,
        mail: record.mail,
        uniqueId: assembleUniqueID(record),
        entityId: identifier,
        isRoleAttachable: record.source !== fieldNames.sources.mir,
    };

    cleanObj(digitalIdentity);

    return digitalIdentity;
};
