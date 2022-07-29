import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, getAssociatedTokenAddress} from '../src'; 

import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as anchor from '@project-serum/anchor';
import { findMetadataPda } from '@metaplex-foundation/js';


const INITIALIZE = true;

//export async function tokenSetup(){
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
    console.log('Airdrop tx:', fromAirdropSignature);

    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);

    // Generate a new wallet to receive newly minted token
    const toWallet = Keypair.generate();

    // Create new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
    console.log('Mint Address:', mint);

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

    
    const metadataPDA = await findMetadataPda(mint);
    const tokenATA = await getAssociatedTokenAddress(mint, fromWallet.publicKey);
    const tokenMetadata = {
      name: "Owais Token", 
      symbol: "OTT",
      uri: "https://gateway.pinata.cloud/ipfs/QmX2vPUENq2udLNzp8ChfiV6UF48ywyRHtPdSbjz3u1qi5",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null
    } as mpl.DataV2;


   const ix =  mpl.createCreateMetadataAccountV2Instruction({
        metadata: metadataPDA,
        mint: mint,
        mintAuthority: fromWallet.publicKey,
        payer: fromWallet.publicKey,
        updateAuthority: fromWallet.publicKey,
      },
      { createMetadataAccountArgsV2: 
        { 
          data: tokenMetadata, 
          isMutable: true 
        } 
      }
    )

    const tx = new Transaction();
    tx.add(ix);
    signature = await sendAndConfirmTransaction(connection, tx, [fromWallet]);
    