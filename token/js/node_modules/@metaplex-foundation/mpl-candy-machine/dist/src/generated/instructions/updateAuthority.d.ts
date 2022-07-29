import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export declare type UpdateAuthorityInstructionArgs = {
    newAuthority: beet.COption<web3.PublicKey>;
};
export declare const updateAuthorityStruct: beet.FixableBeetArgsStruct<UpdateAuthorityInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type UpdateAuthorityInstructionAccounts = {
    candyMachine: web3.PublicKey;
    authority: web3.PublicKey;
    wallet: web3.PublicKey;
};
export declare const updateAuthorityInstructionDiscriminator: number[];
export declare function createUpdateAuthorityInstruction(accounts: UpdateAuthorityInstructionAccounts, args: UpdateAuthorityInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
