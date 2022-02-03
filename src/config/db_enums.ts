import fieldNames from './fieldNames';

// Map between source and roleId suffix
export const ROLE_ID_SUFFIXES: [string, string][] = [
    [fieldNames.sources.ads, 'rabiran'],
    [fieldNames.sources.lmn, 'lmn'],
    [fieldNames.sources.mdn, 'mdn'],
    [fieldNames.sources.es, 'jello'],
    [fieldNames.sources.adNN, 'adnn'],
    [fieldNames.sources.sf, 'leonardo'],
    [fieldNames.sources.city, 'city'],
];

// Sources under OneTree source for roles
export const oneTreeSources = [fieldNames.sources.ads, fieldNames.sources.lmn, fieldNames.sources.mdn];

// export { oneTreeSources, ROLE_ID_SUFFIXES };
