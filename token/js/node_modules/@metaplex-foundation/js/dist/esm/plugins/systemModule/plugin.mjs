import { SystemProgram } from '@solana/web3.js';
import { SystemClient } from './SystemClient.mjs';
import { createAccountOperation, createAccountOperationHandler } from './createAccount.mjs';
import { transferSolOperation, transferSolOperationHandler } from './transferSol.mjs';

const systemModule = () => ({
  install(metaplex) {
    // Program.
    metaplex.programs().register({
      name: 'SystemProgram',
      address: SystemProgram.programId
    }); // Operations.

    const op = metaplex.operations();
    op.register(createAccountOperation, createAccountOperationHandler);
    op.register(transferSolOperation, transferSolOperationHandler);

    metaplex.system = function () {
      return new SystemClient(this);
    };
  }

});

export { systemModule };
//# sourceMappingURL=plugin.mjs.map
