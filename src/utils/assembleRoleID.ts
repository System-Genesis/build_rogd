import matchedRecordType from '../types/matchedRecord';
import { ROLE_ID_SUFFIXES } from '../config/db_enums';

const roleIdSuffixes: Map<string, string> = new Map<string, string>(ROLE_ID_SUFFIXES);

export default (record: matchedRecordType): string => {
    return `${record.userID.split('@')[0]}@${roleIdSuffixes.get(record.source)}`;
};
