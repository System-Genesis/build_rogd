import roleType from '../types/role';
import matchedRecordType from '../types/matchedRecord';
import assembleRoleID from '../utils/assembleRoleID';
import cleanObj from '../utils/removeBlankAtt';

export default (record: matchedRecordType, DIUniqueID: string) => {

    const role: roleType = {
        roleId: assembleRoleID(record),
        jobTitle: record.job,
        digitalIdentityUniqueId: DIUniqueID,
        hierarchy: record.hierarchy,
        source: record.source,
    }

    cleanObj(role);

    return role;

}