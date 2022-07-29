import { toToken } from './Token.mjs';
import { toTokenAccount } from './accounts.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindTokenByAddressOperation';
const findTokenByAddressOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const findTokenByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const account = toTokenAccount(await metaplex.rpc().getAccount(address, commitment));
    return toToken(account);
  }
};

export { findTokenByAddressOperation, findTokenByAddressOperationHandler };
//# sourceMappingURL=findTokenByAddress.mjs.map
