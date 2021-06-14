import digitalIndentityObj from '../types/digitalIndentity';
import roleObj from '../types/role';
import organizationGroupObj from '../types/organizationGroup';

export default (obj: digitalIndentityObj | roleObj | organizationGroupObj): void => {
    for (const propName in obj) {
        if (!obj[propName]) {
            delete obj[propName];
        }
    }
}