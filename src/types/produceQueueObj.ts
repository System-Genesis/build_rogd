import digitalIdentityObj from './digitalIdentity';
import roleObj from './role';
import organizationGroupObj from './organizationGroup';

type produceQueueObj = {
    og: organizationGroupObj | null;
    di: digitalIdentityObj;
    role: roleObj;
}

export default produceQueueObj;