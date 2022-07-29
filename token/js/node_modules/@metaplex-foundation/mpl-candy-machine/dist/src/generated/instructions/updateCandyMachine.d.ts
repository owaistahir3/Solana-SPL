import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { CandyMachineData } from '../types/CandyMachineData';
export declare type UpdateCandyMachineInstructionArgs = {
    data: CandyMachineData;
};
export declare const updateCandyMachineStruct: beet.FixableBeetArgsStruct<UpdateCandyMachineInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type UpdateCandyMachineInstructionAccounts = {
    candyMachine: web3.PublicKey;
    authority: web3.PublicKey;
    wallet: web3.PublicKey;
};
export declare const updateCandyMachineInstructionDiscriminator: number[];
export declare function createUpdateCandyMachineInstruction(accounts: UpdateCandyMachineInstructionAccounts, args: UpdateCandyMachineInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
