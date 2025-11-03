use anchor_lang::prelude::*;
use anchor_spl::token_2022::{Token2022, TransferChecked, transfer_checked};


use crate::state::Vault;
use crate::events::DepositEvent;
use crate::errors::VaultError;

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: Mint account validated by CPI in token program
    pub mint: AccountInfo<'info>,
    /// CHECK: User ATA validated by Token Program during transfer
    #[account(mut)]
    pub user_ata: AccountInfo<'info>,
    /// CHECK: Vault ATA validated by Token Program during transfer
    #[account(mut)]
    pub vault_ata: AccountInfo<'info>,

    #[account(
    mut,
    //has_one = vault_authority,
    constraint = !vault.locked,
    )]
    pub vault: Account<'info, Vault>,
    pub token_program: Program<'info, Token2022>,

}

pub fn deposit_token (ctx: Context<Deposit>, amount: u64) -> Result<()>{
    //implementing the deposit token funcionality
    let vault = &ctx.accounts.vault;
    let user = &ctx.accounts.user;

    //check user has enough tokens .. later implementation

    //Check that vault is not locked
    require!(!vault.locked, VaultError::VaultLocked);

    // ✅ 2. Transfer tokens via CPI
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        TransferChecked {
            from: ctx.accounts.user_ata.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.vault_ata.to_account_info(),
            authority: user.to_account_info(),
        },
    );
    // decimals = 6 for PATS
    transfer_checked(cpi_ctx, amount, 6)?;
    //emit event
    emit!(DepositEvent {
        user: user.key(),
        vault: vault.key(),
        mint: ctx.accounts.mint.key(),
        amount
    });

    Ok(())

}