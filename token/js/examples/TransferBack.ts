import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '../src'; // @FIXME: replace with @solana/spl-token

import async from './create_mint_and_transfer_tokens';