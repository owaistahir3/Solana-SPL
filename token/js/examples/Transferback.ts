import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '../src'; // @FIXME: replace with @solana/spl-token

import {toWallet, fromWallet, connection, toTokenAccount, fromTokenAccount} from './create_mint_and_transfer_tokens';

// Transfering some SOL to the new wallet
const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toWallet.publicKey,
      lamports: LAMPORTS_PER_SOL / 2,
    }),
  );

  // Sign transaction, broadcast, and confirm
  let signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet],
  );
  console.log('Sol Transfer Tx', signature);

    // Transfer the token back to the "fromTokenAccount" we just created
    signature = await transfer(
        connection,
        toWallet,
        toTokenAccount.address,
        fromTokenAccount.address,
        toWallet.publicKey,
        1000000000,
        []
    );
    console.log('transferback tx:', signature);
