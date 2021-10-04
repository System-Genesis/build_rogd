import roleType from '../types/role';
import matchedRecordType from '../types/matchedRecord';
import assembleRoleID from '../utils/assembleRoleID';
import { oneTreeSources } from '../config/db_enums';
import fieldNames from '../config/fieldNames';

export default (record: matchedRecordType): roleType => {
    return {
        roleId: assembleRoleID(record),
        jobTitle: record.job || fieldNames.unknown,
        source: oneTreeSources.includes(record.source) ? fieldNames.sources.oneTree : record.source,
    };
};
