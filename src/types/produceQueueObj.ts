import digitalIndentityObj from './digitalIndentity';
import roleObj from './role';
import organizationGroupObj from './organizationGroup';

type produceQueueObj = {
    og: organizationGroupObj;
    di: digitalIndentityObj;
    role: roleObj;
}

export default produceQueueObj;