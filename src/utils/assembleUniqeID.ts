import matchedRecordType from '../types/matchedRecord';
import { DOMAIN_SUFFIXES } from '../config/db_enums';
import fieldNames from '../config/fieldNames';

const domainSuffixes: Map<string, string> = new Map<string, string>(JSON.parse(JSON.stringify(DOMAIN_SUFFIXES)));

export default (record: matchedRecordType): string => {
    if (record.source === fieldNames.sources.mir) {
        return '';
    }

    return `${record.userID}${domainSuffixes.get(record.source)}`
}