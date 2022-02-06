#Build ROGD

Creates a digital identity, role and group objects from the given record.

Role and group may not be built for multiple reasons:

1. The record doesn't have hierarchy field.
2. The record is from Mir source.

After creating all the objects, sends an object contains all the objects to the Create RGBE service.

In case the record's source is Mir, also sends an array of all the record's identifiers.

## Objects

Digital Identity:

```
{
    type: string;
    source: string;
    mail?: string;
    uniqueId: string;
    entityId: string;
    isRoleAttachable: boolean;
}
```

Role:

```
{
    roleId: string;
    jobTitle?: string;
    source: string;
};
```

Group:

```
{
    name: string;
    source: string;
    hierarchy: string;
};
```

## Input

```
{
    firstName?: string;
    lastName?: string;
    rank?: string;
    clearance?: string;
    sex?: string;
    personalNumber?: string;
    identityCard?: string;
    dischargeDay?: string;
    akaUnit?: string;
    entityType?: string;
    serviceType?: string;
    mobilePhone?: string[];
    phone?: string[];
    birthDate?: string;
    address?: string;
    mail?: string;
    job?: string;
    hierarchy?: string;
    userID?: string;
    source?: string;
    goalUserId?: string;
    pictures?: picture;
}
```

## Output

-   Mir source:

```
    {
        di: digitalIdentityType;
        role: roleType;
        group: groupType;
        identifiers: string[];
    }
```

-   Other sources:

```
    {
        di: digitalIdentityType;
        role: roleType;
        group: groupType;
    }
```
