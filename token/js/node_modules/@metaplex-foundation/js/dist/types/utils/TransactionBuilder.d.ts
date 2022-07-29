import { Blockhash, ConfirmOptions, PublicKey, SignaturePubkeyPair, Transaction, TransactionInstruction } from '@solana/web3.js';
import type { Signer } from '../types';
import type { Metaplex } from '../Metaplex';
import { SendAndConfirmTransactionResponse } from '..';
export declare type InstructionWithSigners = {
    instruction: TransactionInstruction;
    signers: Signer[];
    key?: string;
};
declare type TransactionOptions = {
    /** The transaction fee payer */
    feePayer?: PublicKey | null;
    /** One or more signatures */
    signatures?: Array<SignaturePubkeyPair>;
    /** A recent blockhash */
    blockhash: Blockhash;
    /** the last block chain can advance to before tx is exportd expired */
    lastValidBlockHeight: number;
};
export declare class TransactionBuilder<C extends object = object> {
    /** The list of all instructions and their respective signers. */
    private records;
    /** Options used when building the transaction. */
    private transactionOptions?;
    /** The signer to use to pay for transaction fees. */
    private feePayer;
    /** Any additional context gathered when creating the transaction builder. */
    private context;
    constructor(transactionOptions?: TransactionOptions);
    static make<C extends object = object>(transactionOptions?: TransactionOptions): TransactionBuilder<C>;
    prepend(...txs: (InstructionWithSigners | TransactionBuilder)[]): TransactionBuilder<C>;
    append(...txs: (InstructionWithSigners | TransactionBuilder)[]): TransactionBuilder<C>;
    add(...txs: (InstructionWithSigners | TransactionBuilder)[]): TransactionBuilder<C>;
    splitUsingKey(key: string, include?: boolean): [TransactionBuilder, TransactionBuilder];
    splitBeforeKey(key: string): [TransactionBuilder, TransactionBuilder];
    splitAfterKey(key: string): [TransactionBuilder, TransactionBuilder];
    getInstructionsWithSigners(): InstructionWithSigners[];
    getInstructions(): TransactionInstruction[];
    getInstructionCount(): number;
    isEmpty(): boolean;
    getSigners(): Signer[];
    setTransactionOptions(transactionOptions: TransactionOptions): TransactionBuilder<C>;
    getTransactionOptions(): TransactionOptions | undefined;
    setFeePayer(feePayer: Signer): TransactionBuilder<C>;
    getFeePayer(): PublicKey | undefined;
    setContext(context: C): TransactionBuilder<C>;
    getContext(): C;
    when(condition: boolean, callback: (tx: TransactionBuilder<C>) => TransactionBuilder<C>): TransactionBuilder<C>;
    unless(condition: boolean, callback: (tx: TransactionBuilder<C>) => TransactionBuilder<C>): TransactionBuilder<C>;
    toTransaction(): Transaction;
    sendAndConfirm(metaplex: Metaplex, confirmOptions?: ConfirmOptions): Promise<{
        response: SendAndConfirmTransactionResponse;
    } & C>;
}
export {};
