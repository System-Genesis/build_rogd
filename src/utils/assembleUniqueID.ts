import matchedRecordType from '../types/matchedRecord';
import { DOMAIN_SUFFIXES } from '../config/db_enums';

const domainSuffixes: Map<string, string> = new Map<string, string>(JSON.parse(JSON.stringify(DOMAIN_SUFFIXES)));

export default (record: matchedRecordType): string => {
    return `${record.userID}${domainSuffixes.get(record.source)}`;
};
