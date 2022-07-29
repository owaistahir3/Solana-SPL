import { TokenBuildersClient } from './TokenBuildersClient.mjs';
import { createMintOperation } from './createMint.mjs';
import { createTokenOperation } from './createToken.mjs';
import { createTokenWithMintOperation } from './createTokenWithMint.mjs';
import { findMintByAddressOperation } from './findMintByAddress.mjs';
import { findTokenByAddressOperation } from './findTokenByAddress.mjs';
import { findTokenWithMintByAddressOperation } from './findTokenWithMintByAddress.mjs';
import { findTokenWithMintByMintOperation } from './findTokenWithMintByMint.mjs';
import { mintTokensOperation } from './mintTokens.mjs';
import { sendTokensOperation } from './sendTokens.mjs';
import { Task } from '../../utils/Task.mjs';

class TokenClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new TokenBuildersClient(this.metaplex);
  }

  createMint(input = {}) {
    return new Task(async scope => {
      const operation = createMintOperation(input);
      const output = await this.metaplex.operations().execute(operation, scope);
      scope.throwIfCanceled();
      const mint = await this.findMintByAddress(output.mintSigner.publicKey).run(scope);
      return { ...output,
        mint
      };
    });
  }

  createToken(input) {
    return new Task(async scope => {
      const operation = createTokenOperation(input);
      const output = await this.metaplex.operations().execute(operation, scope);
      scope.throwIfCanceled();
      const token = await this.findTokenByAddress(output.tokenAddress).run(scope);
      return { ...output,
        token
      };
    });
  }

  createTokenWithMint(input = {}) {
    return new Task(async scope => {
      const operation = createTokenWithMintOperation(input);
      const output = await this.metaplex.operations().execute(operation, scope);
      scope.throwIfCanceled();
      const token = await this.findTokenWithMintByMint({
        mint: output.mintSigner.publicKey,
        address: output.tokenAddress,
        addressType: 'token'
      }).run(scope);
      return { ...output,
        token
      };
    });
  }

  findMintByAddress(address, options) {
    return this.metaplex.operations().getTask(findMintByAddressOperation({
      address,
      ...options
    }));
  }

  findTokenByAddress(address, options) {
    return this.metaplex.operations().getTask(findTokenByAddressOperation({
      address,
      ...options
    }));
  }

  findTokenWithMintByAddress(address, options) {
    return this.metaplex.operations().getTask(findTokenWithMintByAddressOperation({
      address,
      ...options
    }));
  }

  findTokenWithMintByMint(input) {
    return this.metaplex.operations().getTask(findTokenWithMintByMintOperation(input));
  }

  mintTokens(input) {
    return this.metaplex.operations().getTask(mintTokensOperation(input));
  }

  sendTokens(input) {
    return this.metaplex.operations().getTask(sendTokensOperation(input));
  }

}

export { TokenClient };
//# sourceMappingURL=TokenClient.mjs.map
