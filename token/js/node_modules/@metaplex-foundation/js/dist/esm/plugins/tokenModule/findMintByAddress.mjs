import { toMint } from './Mint.mjs';
import { toMintAccount } from './accounts.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindMintByAddressOperation';
const findMintByAddressOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const findMintByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const account = toMintAccount(await metaplex.rpc().getAccount(address, commitment));
    return toMint(account);
  }
};

export { findMintByAddressOperation, findMintByAddressOperationHandler };
//# sourceMappingURL=findMintByAddress.mjs.map
