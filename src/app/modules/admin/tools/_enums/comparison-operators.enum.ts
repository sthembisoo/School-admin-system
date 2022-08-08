/*
    https://cloud.google.com/firestore/docs/query-data/queries
*/
export enum ComparisonOperators {
    lessThan = '<',
    lessThanOrEqual = '<=',
    greaterThan = '>',
    greaterThanOrEqual = '>=',
    equal = '==',
    notEqualto = '!=',
    arrayContains = 'array-contains',
    arrayContainsAny = 'array-contains-any',
    in = 'in',
    notIn = 'not-in',
}
