import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '../src'; // @FIXME: replace with @solana/spl-token

import {tokenSetup} from './create_mint_and_transfer_tokens';

tokenSetup().then((res)=>{ console.log('res',res)}).catch(err=>{console.log(err)});
// Transfering some SOL to the new wallet
const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: tokenSetup.fromWallet.publicKey,
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

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log('transfer tx:', signature);

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
