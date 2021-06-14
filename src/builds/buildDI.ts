import matchedRecordType from '../types/matchedRecord';
import fieldNames from '../config/fieldNames';
import cleanObj from '../utils/removeBlankAtt';
import digitalIndentityObj from '../types/digitalIndentity';
import assembleUnieqID from '../utils/assembleUniqeID';

export default (record: matchedRecordType, identifier: string) => {

    const digitalIndentity: digitalIndentityObj = {
        type: record.source === fieldNames.sources.mir ? 'digUser' : 'domUser',
        source: record.source,
        mail: record.mail,
        uniqeId: assembleUnieqID(record),
        entityId: identifier,
        isRoleAttachable: record.source === fieldNames.sources.mir ? false : true
    }

    cleanObj(digitalIndentity);

    return digitalIndentity;
}