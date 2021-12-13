import buildDI from '../src/builds/buildDI';
import buildOG from '../src/builds/buildOG';
import buildRole from '../src/builds/buildRole';
import digitalIdentityObj from '../src/types/digitalIdentity';
import matchedRecord from '../src/types/matchedRecord';
import organizationGroupObj from '../src/types/organizationGroup';
import roleObj from '../src/types/role';

describe('Match City unit testings', () => {
    test("Mir di -> don't build OG and Role, type of DI is digUser", () => {
        const record: matchedRecord = {
            entityType: 'agumon',
            userID: 'ii251578198',
            mobilePhone: ['0514047708'],
            clearance: '4',
            firstName: 'Liza',
            lastName: 'Gerhold',
            personalNumber: '3048452',
            rank: 'rookie',
            dischargeDay: '2023-10-28T07:13:35.842Z',
            job: 'Principal Communications Associate',
            hierarchy: 'wallmart/dolorem/ea',
            source: 'mir_name',
        };
        const identifier: string = (record.identityCard || record.personalNumber || record.goalUserId)!;
        const di: digitalIdentityObj = buildDI(record, identifier);
        const role: roleObj | null = record.hierarchy && di.isRoleAttachable ? buildRole(record) : null;
        const og: organizationGroupObj | null = role ? buildOG(record) : null;
        expect(role).toEqual(null);
        expect(og).toEqual(null);
        expect(di.type).toEqual('kaki');
    });

    test("No hierarchy -> don't build OG and Role", () => {
        const record: matchedRecord = {
            entityType: 'agumon',
            userID: 'ii251578198',
            mobilePhone: ['0514047708'],
            clearance: '4',
            firstName: 'Liza',
            lastName: 'Gerhold',
            personalNumber: '3048452',
            rank: 'rookie',
            dischargeDay: '2023-10-28T07:13:35.842Z',
            job: 'Principal Communications Associate',
            source: 'city_name',
        };
        const identifier: string = (record.identityCard || record.personalNumber || record.goalUserId)!;
        const di: digitalIdentityObj = buildDI(record, identifier);
        const role: roleObj | null = record.hierarchy && di.isRoleAttachable ? buildRole(record) : null;
        const og: organizationGroupObj | null = role ? buildOG(record) : null;
        expect(role).toEqual(null);
        expect(og).toEqual(null);
    });

    test('Check og is built OK', () => {
        const record: matchedRecord = {
            entityType: 'agumon',
            userID: 'ii251578198',
            mobilePhone: ['0514047708'],
            clearance: '4',
            firstName: 'Liza',
            lastName: 'Gerhold',
            personalNumber: '3048452',
            rank: 'rookie',
            dischargeDay: '2023-10-28T07:13:35.842Z',
            job: 'Principal Communications Associate',
            hierarchy: 'wallmart/dolorem/ea',
            source: 'es_name',
        };
        const identifier: string = (record.identityCard || record.personalNumber || record.goalUserId)!;
        const di: digitalIdentityObj = buildDI(record, identifier);
        const role: roleObj | null = record.hierarchy && di.isRoleAttachable ? buildRole(record) : null;
        const og: organizationGroupObj | null = role ? buildOG(record) : null;
        expect(og).toEqual({
            name: 'ea',
            source: 'es_name',
            hierarchy: 'wallmart/dolorem',
            status: 'active',
        });
    });
});
