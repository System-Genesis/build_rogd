import digitalIdentityObj from './digitalIdentity';
import organizationGroupObj from './organizationGroup';
import roleObj from './role';

export type queueObject = {
    di: digitalIdentityObj;
    og: organizationGroupObj | null;
    role: roleObj | null;
};
