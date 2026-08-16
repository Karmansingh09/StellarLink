#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct PaymentEscrowContract;

#[contractimpl]
impl PaymentEscrowContract {
    pub fn lock_payment(env: Env, escrow_id: String, _sender: String, amount: i128) -> bool {
        env.storage().instance().set(&escrow_id, &amount);
        true
    }

    pub fn release_payment(env: Env, escrow_id: String, _recipient: String) -> bool {
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

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::String;

    #[test]
    fn test_payment_escrow() {
        let env = Env::default();
        let contract_id = env.register_contract(None, PaymentEscrowContract);
        let client = PaymentEscrowContractClient::new(&env, &contract_id);

        let escrow_id = String::from_str(&env, "ESC-9001");
        let sender = String::from_str(&env, "G_SENDER");
        let recipient = String::from_str(&env, "G_RECIPIENT");

        assert!(client.lock_payment(&escrow_id, &sender, &1000));
        assert!(client.release_payment(&escrow_id, &recipient));
        assert!(!client.release_payment(&escrow_id, &recipient));

        let escrow_id2 = String::from_str(&env, "ESC-9002");
        assert!(client.lock_payment(&escrow_id2, &sender, &500));
        assert!(client.refund_payment(&escrow_id2));
    }
}
