import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddressSync,
  mintTo,
  transferChecked,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { VaultPats } from "../target/types/vault_pats";

describe("🔒 PATS Vault Local Test", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet as anchor.Wallet;
  const connection = provider.connection;
  const program = anchor.workspace.VaultPats as Program<VaultPats>;

  // ⚙️ Reuse your existing PATS mint (on Devnet or local)
  const PATS_MINT = new PublicKey("6qRspao9mSVzAPKzxB443uzhsuCwbWbUUanfhXDj6QT8");

  it("🚀 Deposits tokens into the vault", async () => {
    console.log("🔹 Using wallet:", wallet.publicKey.toBase58());
    console.log("🔹 Using PATS mint:", PATS_MINT.toBase58());

    // 1️⃣ Derive the Vault PDA
  const [vaultPDA, vaultBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), PATS_MINT.toBuffer()],
    program.programId
  );
  console.log("🏦 Vault PDA:", vaultPDA.toBase58());

    // 2️⃣ Derive vault PDA
  const [vaultPDA, vaultBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), PATS_MINT.toBuffer()],
    program.programId
  );
  console.log("🏦 Vault PDA:", vaultPDA.toBase58());

// 3️⃣ Get or create the vault ATA
const vaultATA = await getOrCreateAssociatedTokenAccount(
  connection,
  wallet.payer,              // payer for account creation
  PATS_MINT,
  vaultPDA,
  true,                      // allow off-curve PDA owner
  "confirmed",
  {},
  TOKEN_2022_PROGRAM_ID
);
console.log("💰 Vault ATA:", vaultATA.address.toBase58());

    // 4️⃣ (Optional) Mint test tokens to user (local test only)
    // comment this out on Devnet if you already have PATS balance
    await mintTo(
      connection,
      wallet.payer,
      PATS_MINT,
      user_ata.address,
      wallet.payer,
      1_000_000_000, // 1000 PATS (6 decimals)
      [],
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    // 5️⃣ Execute deposit instruction
    const depositAmount = new anchor.BN(500_000_000); // 500 PATS
    const tx = await program.methods
      .depositToken(depositAmount)
      .accounts({
        user: wallet.publicKey,
        mint: PATS_MINT,
        user_ata: userATA.address,
        vault_ata: vaultATA,
        vault: vaultPDA,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
      })
      .rpc();

    console.log("✅ Deposit Tx Signature:", tx);
    console.log(`🔗 Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
  });
});