/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
export declare type Account<T> = Readonly<{
    publicKey: PublicKey;
    executable: boolean;
    owner: PublicKey;
    lamports: number;
    data: T;
    rentEpoch?: number;
}>;
export declare type MaybeAccount<T> = (Account<T> & {
    readonly exists: true;
}) | {
    readonly publicKey: PublicKey;
    readonly exists: false;
};
export declare type UnparsedAccount = Account<Buffer>;
export declare type UnparsedMaybeAccount = MaybeAccount<Buffer>;
export declare type AccountParser<T> = {
    name: string;
    deserialize: (data: Buffer, offset?: number) => [T, number];
};
export declare type AccountParsingFunction<T> = {
    (unparsedAccount: UnparsedAccount): Account<T>;
    (unparsedAccount: UnparsedMaybeAccount): MaybeAccount<T>;
};
export declare type AccountParsingAndAssertingFunction<T> = (unparsedAccount: UnparsedAccount | UnparsedMaybeAccount, solution?: string) => Account<T>;
export declare function parseAccount<T>(account: UnparsedMaybeAccount, parser: AccountParser<T>): MaybeAccount<T>;
export declare function parseAccount<T>(account: UnparsedAccount, parser: AccountParser<T>): Account<T>;
export declare function getAccountParsingFunction<T>(parser: AccountParser<T>): AccountParsingFunction<T>;
export declare function toAccount<T>(account: UnparsedAccount | UnparsedMaybeAccount, parser: AccountParser<T>, solution?: string): Account<T>;
export declare function getAccountParsingAndAssertingFunction<T>(parser: AccountParser<T>): AccountParsingAndAssertingFunction<T>;
export declare function assertAccountExists<T>(account: MaybeAccount<T>, name?: string, solution?: string): asserts account is Account<T> & {
    exists: true;
};
