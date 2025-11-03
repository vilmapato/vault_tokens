import { PublicKey } from "@solana/web3.js";


const MINT = new PublicKey("GTRBWpSFQ3fL1kRNd7BpUtcterfGvhmpcZeojoFm5nR"); // your PATS mint
const PROGRAM_ID = new PublicKey("GqMzWUJCGT1u4YJW5cPgEk6V9bGB7UqsmhxkP4ui5Tfp");

const [vaultPDA, bump] = PublicKey.findProgramAddressSync(
  [Buffer.from("vault"), MINT.toBuffer()],
  PROGRAM_ID
);

console.log("✅ Vault PDA:", vaultPDA.toBase58());
console.log("🔢 Bump:", bump);

import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

const vaultATA = getAssociatedTokenAddressSync(
  MINT,
  vaultPDA,
  true, // allow off-curve PDA
  TOKEN_2022_PROGRAM_ID
);

console.log("💰 Vault ATA:", vaultATA.toBase58());
console.log(`🔗 Explorer: https://explorer.solana.com/address/${vaultATA.toBase58()}?cluster=devnet`);