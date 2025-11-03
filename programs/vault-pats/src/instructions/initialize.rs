use anchor_lang::prelude::*;

use crate::state::Vault;
use crate::events::InitializeVaultEvent;

#[derive(Accounts)]
pub struct InitializeVault<'info>{
    #[account(mut)]
    pub vault_authority: Signer<'info>,
    /// CHECK: The mint address is only used to derive the vault PDA
    pub mint: AccountInfo<'info>,
    #[account( //not sure if has_one authority needs to be added here..
        init,
        payer = vault_authority,
        space = 8 + Vault::INIT_SPACE,
        seeds = [b"vault", mint.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    pub system_program: Program<'info, System>

}

pub fn _init_vault(ctx: Context<InitializeVault>, locked: bool) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    let mint = &mut ctx.accounts.mint;
    
    vault.vault_authority = ctx.accounts.vault_authority.key();
    vault.locked = locked;

    emit!(InitializeVaultEvent {
        vault: vault.key(),
        vault_authority: vault.vault_authority,
        mint: mint.key(),
        locked,
    });

  Ok(())

}