import { useOperation } from '../../types/Operation.mjs';
import { amount } from '../../types/Amount.mjs';

// -----------------
// Operation
// -----------------
const Key = 'LoadListingOperation';
const loadListingOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const loadListingOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      lazyListing,
      loadJsonMetadata = true,
      commitment
    } = operation.input;
    const tokenModel = await metaplex.nfts().findTokenWithMetadataByMetadata(lazyListing.metadataAddress, lazyListing.sellerAddress, {
      commitment,
      loadJsonMetadata
    }).run(scope);
    return { ...lazyListing,
      model: 'listing',
      lazy: false,
      token: tokenModel,
      tokens: amount(lazyListing.tokens, tokenModel.mint.currency)
    };
  }
};

export { loadListingOperation, loadListingOperationHandler };
//# sourceMappingURL=loadListing.mjs.map
