import roleType from '../types/role';
import matchedRecordType from '../types/matchedRecord';
import assembleRoleID from '../utils/assembleRoleID';
import { oneTreeSources } from '../config/db_enums';
import fieldNames from '../config/fieldNames';

/**
 * Creates the role object.
 * @param { matchedRecordType } record - The record got from the queue
 * @return { roleType } - The role Object.
 */
export default (record: matchedRecordType): roleType => {
    return {
        roleId: assembleRoleID(record),
        jobTitle: record.job || fieldNames.unknown,
        source: oneTreeSources.includes(record.source) ? fieldNames.sources.oneTree : record.source,
    };
};
