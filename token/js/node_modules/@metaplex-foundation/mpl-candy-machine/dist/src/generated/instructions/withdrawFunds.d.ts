import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const withdrawFundsStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export declare type WithdrawFundsInstructionAccounts = {
    candyMachine: web3.PublicKey;
    authority: web3.PublicKey;
};
export declare const withdrawFundsInstructionDiscriminator: number[];
export declare function createWithdrawFundsInstruction(accounts: WithdrawFundsInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
