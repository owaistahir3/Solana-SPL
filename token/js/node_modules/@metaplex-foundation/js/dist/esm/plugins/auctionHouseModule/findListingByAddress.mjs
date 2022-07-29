import { toListingReceiptAccount } from './accounts.mjs';
import { toListing } from './Listing.mjs';
import { findListingReceiptPda } from './pdas.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindListingByAddressOperation';
const findListingByAddressOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const findListingByAddressOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      address,
      auctionHouse,
      commitment,
      loadJsonMetadata = true
    } = operation.input;
    const receiptAddress = findListingReceiptPda(address);
    const account = toListingReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    const tokenModel = await metaplex.nfts().findTokenWithMetadataByMetadata(account.data.metadata, account.data.seller, {
      commitment,
      loadJsonMetadata
    }).run(scope);
    return toListing(account, auctionHouse, tokenModel);
  }
};

export { findListingByAddressOperation, findListingByAddressOperationHandler };
//# sourceMappingURL=findListingByAddress.mjs.map
