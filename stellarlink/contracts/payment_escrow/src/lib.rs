#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct PaymentEscrowContract;

#[contractimpl]
impl PaymentEscrowContract {
    pub fn lock_payment(env: Env, escrow_id: String, sender: String, amount: i128) -> bool {
        env.storage().instance().set(&escrow_id, &amount);
        true
    }

    pub fn release_payment(env: Env, escrow_id: String, recipient: String) -> bool {
        if env.storage().instance().has(&escrow_id) {
            env.storage().instance().remove(&escrow_id);
            return true;
        }
        false
    }

    pub fn refund_payment(env: Env, escrow_id: String) -> bool {
        if env.storage().instance().has(&escrow_id) {
            env.storage().instance().remove(&escrow_id);
            return true;
        }
        false
    }
}
