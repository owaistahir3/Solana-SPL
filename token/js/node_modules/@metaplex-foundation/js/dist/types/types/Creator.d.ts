import { PublicKey } from '@solana/web3.js';
export declare type Creator = Readonly<{
    address: PublicKey;
    verified: boolean;
    share: number;
}>;
export declare const toUniformCreators: (...addresses: PublicKey[]) => Creator[];
export declare const toUniformVerifiedCreators: (...addresses: PublicKey[]) => Creator[];
