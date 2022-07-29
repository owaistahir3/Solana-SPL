import { createMintBuilder } from './createMint.mjs';
import { createTokenBuilder } from './createToken.mjs';
import { createTokenWithMintBuilder } from './createTokenWithMint.mjs';
import { mintTokensBuilder } from './mintTokens.mjs';
import { sendTokensBuilder } from './sendTokens.mjs';

class TokenBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  createMint(input) {
    return createMintBuilder(this.metaplex, input);
  }

  createToken(input) {
    return createTokenBuilder(this.metaplex, input);
  }

  createTokenWithMint(input) {
    return createTokenWithMintBuilder(this.metaplex, input);
  }

  mintTokens(input) {
    return mintTokensBuilder(this.metaplex, input);
  }

  sendTokens(input) {
    return sendTokensBuilder(this.metaplex, input);
  }

}

export { TokenBuildersClient };
//# sourceMappingURL=TokenBuildersClient.mjs.map
