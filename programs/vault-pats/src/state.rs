use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Vault {
    pub vault_authority: Pubkey,
    pub mint: Pubkey,
    pub locked: bool,
}
