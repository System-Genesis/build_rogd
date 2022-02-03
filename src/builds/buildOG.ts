import matchedRecordType from '../types/matchedRecord';
import organizationGroupObj from '../types/organizationGroup';
import { oneTreeSources } from '../config/db_enums';
import fieldNames from '../config/fieldNames';

/**
 * Creates the group object.
 * @param { matchedRecordType } record - The record got from the queue.
 * @return { organizationGroupObj } - The group object.
 */
export default (record: matchedRecordType): organizationGroupObj => {
    // The name of the group is the last cell in the hierarchy
    return {
        name: record.hierarchy!.substring(record.hierarchy!.lastIndexOf('/') + 1),
        source: oneTreeSources.includes(record.source) ? fieldNames.sources.oneTree : record.source,
        hierarchy: record.hierarchy!.substring(0, record.hierarchy!.lastIndexOf('/')),
    };
};
