import roleType from '../types/role';
import matchedRecordType from '../types/matchedRecord';
import assembleRoleID from '../utils/assembleRoleID';
import cleanObj from '../utils/removeBlankAtt';
import { oneTreeSources } from '../config/db_enums';
import fieldNames from '../config/fieldNames';

export default (record: matchedRecordType, DIUniqueID: string) => {
    const role: roleType = {
        roleId: assembleRoleID(record),
        jobTitle: record.job,
        digitalIdentityUniqueId: DIUniqueID,
        hierarchy: record.hierarchy!,
        source: oneTreeSources.includes(record.source) ? fieldNames.sources.oneTree : record.source,
    };

    cleanObj(role);

    return role;
};
