#![allow(unexpected_cfgs, deprecated)]
use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod events;
pub mod errors;

use instructions::*;

declare_id!("GqMzWUJCGT1u4YJW5cPgEk6V9bGB7UqsmhxkP4ui5Tfp");

#[program]
pub mod vault_pats {
    use super::*;

    pub fn init_vault(ctx: Context<InitializeVault>, locked: bool) -> Result<()> {
       instructions::_init_vault(ctx, locked)
    }

    pub fn deposit_token(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        instructions::deposit_token(ctx, amount)
    }
}
