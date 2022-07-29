import { toTokenWithMint } from './Token.mjs';
import { toMintAccount, toTokenAccount } from './accounts.mjs';
import { toMint } from './Mint.mjs';
import { findAssociatedTokenAccountPda } from './pdas.mjs';
import { TokenAndMintDoNotMatchError } from './errors.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindTokenWithMintByMintOperation';
const findTokenWithMintByMintOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const findTokenWithMintByMintOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      mint,
      address,
      addressType,
      commitment
    } = operation.input;
    const tokenAddress = addressType === 'owner' ? findAssociatedTokenAccountPda(mint, address) : address;
    const accounts = await metaplex.rpc().getMultipleAccounts([mint, tokenAddress], commitment);
    const mintAccount = toMintAccount(accounts[0]);
    const tokenAccount = toTokenAccount(accounts[1]);

    if (!tokenAccount.data.mint.equals(mint)) {
      throw new TokenAndMintDoNotMatchError(tokenAddress, tokenAccount.data.mint, mint);
    }

    return toTokenWithMint(tokenAccount, toMint(mintAccount));
  }
};

export { findTokenWithMintByMintOperation, findTokenWithMintByMintOperationHandler };
//# sourceMappingURL=findTokenWithMintByMint.mjs.map
