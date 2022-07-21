import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '../src'; // @FIXME: replace with @solana/spl-token

import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as anchor from '@project-serum/anchor';

const INITIALIZE = false;

//export async function tokenSetup(){
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
    //console.log('Airdrop tx:', fromAirdropSignature);

    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);

    // Generate a new wallet to receive newly minted token
    const toWallet = Keypair.generate();

    // Create new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
    //console.log('Mint Address:', mint);

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet.publicKey);

    // Mint 1 new token to the "fromTokenAccount" account we just created
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log('mint tx:', signature);

    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(mint.toBytes()); 
    const [MetaDataPDA, _bump] = PublicKey.findProgramAddressSync([seed1, seed2], mpl.PROGRAM_ID);
    const accounts = {
      metadata: MetaDataPDA,
      mint,
      mintAuthority: fromWallet.publicKey,
      payer: fromWallet.publicKey,
      updateAuthority: fromWallet.publicKey,
    }
    const dataV2 = {
      name: "Owais Token",
      symbol: "OTT",
      uri: "https://gateway.pinata.cloud/ipfs/QmV2RWdnRfmBvf3yR7LRxS3XB4uv5XrfAvcHs89zehkndo",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null
  }
  let ix;
  if (INITIALIZE) {
      const args =  {
          createMetadataAccountArgsV2: {
              data: dataV2,
              isMutable: true
          }
      };
      ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args);
  } else {
      const args =  {
          updateMetadataAccountArgsV2: {
              data: dataV2,
              isMutable: true,
              updateAuthority: fromWallet.publicKey,
              primarySaleHappened: true
          }
      };
      ix = mpl.createUpdateMetadataAccountV2Instruction(accounts, args)
  }
  const tx = new Transaction();
  tx.add(ix);
  const txid = await sendAndConfirmTransaction(connection, tx, [fromWallet]);
  console.log(txid);

//}

//tokenSetup();

