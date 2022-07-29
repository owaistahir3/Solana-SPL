import { createAddConfigLinesInstruction } from '@metaplex-foundation/mpl-candy-machine';
import { assertNotFull, assertCanAdd, assertAllConfigLineConstraints } from './asserts.mjs';
import { useOperation } from '../../types/Operation.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'InsertItemsToCandyMachineOperation';
const insertItemsToCandyMachineOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const InsertItemsToCandyMachineOperationHandler = {
  async handle(operation, metaplex) {
    return insertItemsToCandyMachineBuilder(operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
  }

}; // -----------------
// Builder
// -----------------

const insertItemsToCandyMachineBuilder = params => {
  var _params$index, _params$instructionKe;

  const index = (_params$index = params.index) !== null && _params$index !== void 0 ? _params$index : params.candyMachine.itemsLoaded;
  const items = params.items;
  assertNotFull(params.candyMachine, index);
  assertCanAdd(params.candyMachine, index, items.length);
  assertAllConfigLineConstraints(items);
  return TransactionBuilder.make().add({
    instruction: createAddConfigLinesInstruction({
      candyMachine: params.candyMachine.address,
      authority: params.authority.publicKey
    }, {
      index: index.toNumber(),
      configLines: items
    }),
    signers: [params.authority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'insertItems'
  });
};

export { InsertItemsToCandyMachineOperationHandler, insertItemsToCandyMachineBuilder, insertItemsToCandyMachineOperation };
//# sourceMappingURL=insertItemsToCandyMachine.mjs.map
