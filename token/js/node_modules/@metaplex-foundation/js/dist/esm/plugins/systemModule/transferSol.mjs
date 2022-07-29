import { SystemProgram } from '@solana/web3.js';
import { useOperation } from '../../types/Operation.mjs';
import { assertSol } from '../../types/Amount.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';

const Key = 'TransferSolOperation';
const transferSolOperation = useOperation(Key);
const transferSolOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = transferSolBuilder(metaplex, operation.input);
    return builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
  }

}; // -----------------
// Builder
// -----------------

const transferSolBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    from = metaplex.identity(),
    to,
    amount,
    basePubkey,
    seed,
    program = SystemProgram.programId
  } = params;
  assertSol(amount);
  return TransactionBuilder.make().add({
    instruction: SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: amount.basisPoints.toNumber(),
      ...(basePubkey ? {
        basePubkey,
        seed
      } : {}),
      programId: program
    }),
    signers: [from],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'transferSol'
  });
};

export { transferSolBuilder, transferSolOperation, transferSolOperationHandler };
//# sourceMappingURL=transferSol.mjs.map
