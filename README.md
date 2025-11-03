# 🏦 Vault — Task 2 (Vault)

This project demonstrates how to mint a custom Token-2022 token, create a vault, and lock tokens inside it on **Solana Devnet**.

---

Image of successfull transaction:
![Vault_ATA holding Tokens](/docs/complete_transaction.png)

## 🔧 Setup Summary

| Component | Address | Description |
|------------|----------|--------------|
| **PATS Mint (Token-2022)** | `jBhgEBgg6uxxWnRzpw18p35Z1n48U9LAuW4z2USDUn6` | The custom PATS token |
| **Vault PDA (Owner)** | `AajyzPcxuS9R5SvyJB1zEwxJqRkuVLp663THFBZAcVEa` | Vault program’s derived account |
| **Vault ATA** | `5zMPWa5HmQubXpL7dAC2vsWSPoJiXZjnf1cPf8F6Xafc` | Token account where locked PATS are stored |
| **User ATA** | `7iaAzmYLJXxKPgu9b2J9rhoxY3Mq9iLoQ75X4QJsD3BJ` | My personal wallet token account |
| **Program ID** | `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` | SPL Token-2022 Program |
| **Network** | Devnet | |

---

## 🪙 1. Mint the PATS Token

```bash
spl-token create-token \
  --decimals 6 \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --url https://api.devnet.solana.com