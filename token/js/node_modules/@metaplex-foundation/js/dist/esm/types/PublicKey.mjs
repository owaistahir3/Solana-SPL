import { PublicKey } from '@solana/web3.js';

const toPublicKey = value => {
  return typeof value === 'object' && 'publicKey' in value ? value.publicKey : new PublicKey(value);
};

export { toPublicKey };
//# sourceMappingURL=PublicKey.mjs.map
