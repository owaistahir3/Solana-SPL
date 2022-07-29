import { createAccountBuilder } from './createAccount.mjs';
import { transferSolBuilder } from './transferSol.mjs';

class SystemBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  createAccount(input) {
    return createAccountBuilder(this.metaplex, input);
  }

  transferSol(input) {
    return transferSolBuilder(this.metaplex, input);
  }

}

export { SystemBuildersClient };
//# sourceMappingURL=SystemBuildersClient.mjs.map
