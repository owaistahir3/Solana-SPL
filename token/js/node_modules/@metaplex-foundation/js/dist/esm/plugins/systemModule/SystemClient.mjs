import { createAccountOperation } from './createAccount.mjs';
import { SystemBuildersClient } from './SystemBuildersClient.mjs';
import { transferSolOperation } from './transferSol.mjs';

class SystemClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new SystemBuildersClient(this.metaplex);
  }

  createAccount(input) {
    return this.metaplex.operations().getTask(createAccountOperation(input));
  }

  transferSol(input) {
    return this.metaplex.operations().getTask(transferSolOperation(input));
  }

}

export { SystemClient };
//# sourceMappingURL=SystemClient.mjs.map
