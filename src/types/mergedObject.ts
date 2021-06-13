import matchedRecordType from './matchedRecord'

type mergedObj = {
  aka?: { record: matchedRecordType }[];
  eightSocks?: { record: matchedRecordType }[];
  sf?: { record: matchedRecordType }[];
  city?: { record: matchedRecordType }[];
  adNn?: { record: matchedRecordType }[];
  adS?: { record: matchedRecordType }[];

  identifiers: {
    personalNumber: string;
    identityCard: string;
    goalUser: string;
  };
};

export default mergedObj;