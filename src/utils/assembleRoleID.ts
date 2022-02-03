import matchedRecordType from '../types/matchedRecord';
import { ROLE_ID_SUFFIXES } from '../config/db_enums';

const roleIdSuffixes: Map<string, string> = new Map<string, string>(ROLE_ID_SUFFIXES);

/**
 * Generating a roleId based on the record's source
 * @param { matchedRecordType } record - The generated record
 * @return { string } - The generated roleId
 */
export default (record: matchedRecordType): string => {
    return `${record.userID.split('@')[0]}@${roleIdSuffixes.get(record.source)}`;
};
