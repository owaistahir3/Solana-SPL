import { toTokenWithMint } from './Token.mjs';
import { toTokenAccount, toMintAccount } from './accounts.mjs';
import { toMint } from './Mint.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindTokenWithMintByAddressOperation';
const findTokenWithMintByAddressOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const findTokenWithMintByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const tokenAccount = toTokenAccount(await metaplex.rpc().getAccount(address, commitment));
    const mintAccount = toMintAccount(await metaplex.rpc().getAccount(tokenAccount.data.mint, commitment));
    return toTokenWithMint(tokenAccount, toMint(mintAccount));
  }
};

export { findTokenWithMintByAddressOperation, findTokenWithMintByAddressOperationHandler };
//# sourceMappingURL=findTokenWithMintByAddress.mjs.map
