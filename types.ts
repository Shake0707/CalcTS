export enum EOperators {
    plus = '+',
    minus = '-',
    disjunction = '/',
    increase = 'x'
}

export interface ICalcObj {
    firstOperand: number;
    operator: EOperators | null;
    result: string | number;
}