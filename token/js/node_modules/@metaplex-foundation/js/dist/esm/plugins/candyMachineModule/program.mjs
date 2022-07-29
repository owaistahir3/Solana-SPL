import { PROGRAM_ID } from '@metaplex-foundation/mpl-candy-machine';
import { CandyMachineGpaBuilder } from './gpaBuilders.mjs';

const CandyMachineProgram = {
  publicKey: PROGRAM_ID,

  accounts(metaplex) {
    return new CandyMachineGpaBuilder(metaplex, this.publicKey);
  }

};

export { CandyMachineProgram };
//# sourceMappingURL=program.mjs.map
