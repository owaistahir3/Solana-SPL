import { toAuctionHouseAccount } from './accounts.mjs';
import { toAuctionHouse } from './AuctionHouse.mjs';
import { useOperation } from '../../types/Operation.mjs';

// -----------------
// Operation
// -----------------
const Key = 'FindAuctionHouseByAddressOperation';
const findAuctionHouseByAddressOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const findAuctionHouseByAddressOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      address,
      commitment
    } = operation.input;
    const account = toAuctionHouseAccount(await metaplex.rpc().getAccount(address, commitment));
    const mintModel = await metaplex.nfts().findMintWithMetadataByAddress(account.data.treasuryMint, {
      loadJsonMetadata: false,
      commitment
    }).run(scope);
    return toAuctionHouse(account, mintModel);
  }
};

export { findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler };
//# sourceMappingURL=findAuctionHouseByAddress.mjs.map
