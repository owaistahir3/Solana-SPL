import { Keypair } from '@solana/web3.js';
import { MintAuthorityMustBeSignerToMintInitialSupplyError } from './errors.mjs';
import { toPublicKey } from '../../types/PublicKey.mjs';
import { isSigner } from '../../types/Signer.mjs';
import { useOperation } from '../../types/Operation.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'CreateTokenWithMintOperation';
const createTokenWithMintOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const createTokenWithMintOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = await createTokenWithMintBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    return builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
  }

}; // -----------------
// Builder
// -----------------

const createTokenWithMintBuilder = async (metaplex, params) => {
  var _params$createMintAcc, _params$initializeMin, _params$createAssocia, _params$createTokenAc, _params$initializeTok;

  const {
    decimals = 0,
    initialSupply,
    mint = Keypair.generate(),
    mintAuthority = metaplex.identity(),
    freezeAuthority = metaplex.identity().publicKey,
    owner = metaplex.identity().publicKey,
    token,
    payer = metaplex.identity(),
    tokenProgram,
    associatedTokenProgram
  } = params;
  const createMintBuilder = await metaplex.tokens().builders().createMint({
    decimals,
    mint,
    payer,
    mintAuthority: toPublicKey(mintAuthority),
    freezeAuthority,
    tokenProgram,
    createAccountInstructionKey: (_params$createMintAcc = params.createMintAccountInstructionKey) !== null && _params$createMintAcc !== void 0 ? _params$createMintAcc : 'createMintAccount',
    initializeMintInstructionKey: (_params$initializeMin = params.initializeMintInstructionKey) !== null && _params$initializeMin !== void 0 ? _params$initializeMin : 'initializeMint'
  });
  const createTokenBuilder = await metaplex.tokens().builders().createToken({
    mint: mint.publicKey,
    owner,
    token,
    payer,
    tokenProgram,
    associatedTokenProgram,
    createAssociatedTokenAccountInstructionKey: (_params$createAssocia = params.createAssociatedTokenAccountInstructionKey) !== null && _params$createAssocia !== void 0 ? _params$createAssocia : 'createAssociatedTokenAccount',
    createAccountInstructionKey: (_params$createTokenAc = params.createTokenAccountInstructionKey) !== null && _params$createTokenAc !== void 0 ? _params$createTokenAc : 'createTokenAccount',
    initializeTokenInstructionKey: (_params$initializeTok = params.initializeTokenInstructionKey) !== null && _params$initializeTok !== void 0 ? _params$initializeTok : 'initializeToken'
  });
  const {
    tokenAddress
  } = createTokenBuilder.getContext();
  return TransactionBuilder.make().setFeePayer(payer).setContext({
    mintSigner: mint,
    tokenAddress
  }) // Create the Mint account.
  .add(createMintBuilder) // Create the Token account.
  .add(createTokenBuilder) // Potentially mint the initial supply to the token account.
  .when(!!initialSupply, builder => {
    var _params$mintTokensIns;

    if (!isSigner(mintAuthority)) {
      throw new MintAuthorityMustBeSignerToMintInitialSupplyError();
    }

    return builder.add(metaplex.tokens().builders().mintTokens({
      mint: mint.publicKey,
      destination: tokenAddress,
      amount: initialSupply,
      mintAuthority,
      tokenProgram,
      instructionKey: (_params$mintTokensIns = params.mintTokensInstructionKey) !== null && _params$mintTokensIns !== void 0 ? _params$mintTokensIns : 'mintTokens'
    }));
  });
};

export { createTokenWithMintBuilder, createTokenWithMintOperation, createTokenWithMintOperationHandler };
//# sourceMappingURL=createTokenWithMint.mjs.map
