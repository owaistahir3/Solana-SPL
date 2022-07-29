import { Keypair, SystemProgram } from '@solana/web3.js';
import { useOperation } from '../../types/Operation.mjs';
import { assertSol } from '../../types/Amount.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';

const Key = 'CreateAccountOperation';
const createAccountOperation = useOperation(Key);
const createAccountOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = await createAccountBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    return builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
  }

}; // -----------------
// Builder
// -----------------

const createAccountBuilder = async (metaplex, params) => {
  var _params$lamports, _params$instructionKe;

  const {
    space,
    payer = metaplex.identity(),
    newAccount = Keypair.generate(),
    program = SystemProgram.programId
  } = params;
  const lamports = (_params$lamports = params.lamports) !== null && _params$lamports !== void 0 ? _params$lamports : await metaplex.rpc().getRent(space);
  assertSol(lamports);
  return TransactionBuilder.make().setFeePayer(payer).setContext({
    newAccount,
    lamports
  }).add({
    instruction: SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      space,
      lamports: lamports.basisPoints.toNumber(),
      programId: program
    }),
    signers: [payer, newAccount],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'createAccount'
  });
};

export { createAccountBuilder, createAccountOperation, createAccountOperationHandler };
//# sourceMappingURL=createAccount.mjs.map
