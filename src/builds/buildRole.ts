import roleType from '../types/role';
import matchedRecordType from '../types/matchedRecord';
import assembleRoleID from '../utils/assembleRoleID';
import { oneTreeSources } from '../config/db_enums';
import fieldNames from '../config/fieldNames';

export default (record: matchedRecordType, DIUniqueID: string): roleType => {
    return {
        roleId: assembleRoleID(record),
        jobTitle: record.job || fieldNames.unknown,
        digitalIdentityUniqueId: DIUniqueID,
        hierarchy: record.hierarchy!,
        source: oneTreeSources.includes(record.source) ? fieldNames.sources.oneTree : record.source,
    };
};
