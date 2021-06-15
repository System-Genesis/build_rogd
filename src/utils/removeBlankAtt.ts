import digitalIdentityObj from '../types/digitalIdentity';
import roleObj from '../types/role';
import organizationGroupObj from '../types/organizationGroup';

export default (obj: digitalIdentityObj | roleObj | organizationGroupObj): void => {
    for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
}