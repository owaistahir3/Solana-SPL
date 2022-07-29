import { Amount, BigNumber } from '../../types';
import { MetaplexFile, StorageDriver } from '../storageModule';
export declare type MockStorageOptions = {
    baseUrl?: string;
    costPerByte?: BigNumber | number;
};
export declare class MockStorageDriver implements StorageDriver {
    private cache;
    readonly baseUrl: string;
    readonly costPerByte: BigNumber;
    constructor(options?: MockStorageOptions);
    getUploadPrice(bytes: number): Promise<Amount>;
    upload(file: MetaplexFile): Promise<string>;
    download(uri: string): Promise<MetaplexFile>;
}
