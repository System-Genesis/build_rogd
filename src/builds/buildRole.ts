import roleType from '../types/role';
import matchedRecordType from '../types/matchedRecord';
import assembleRoleID from '../utils/assembleUniqeID';
import cleanObj from '../utils/removeBlankAtt';

export default (record: matchedRecordType, DIUniqeID: string) => {

    const role: roleType = {
        roleId: assembleRoleID(record),
        jobTitle: record.job,
        digitalIdentityUniqeId: DIUniqeID,
        hierarchy: record.hierarchy,
        source: record.source,
    }

    cleanObj(role);

    return role;

}