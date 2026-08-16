#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct SettlementManagerContract;

#[contractimpl]
impl SettlementManagerContract {
    pub fn create_settlement(env: Env, settlement_id: String, _device_id: String, amount: i128) -> bool {
        env.storage().instance().set(&settlement_id, &amount);
        true
    }

    pub fn execute_settlement(env: Env, settlement_id: String) -> bool {
        if env.storage().instance().has(&settlement_id) {
            env.storage().instance().remove(&settlement_id);
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
    fn test_settlement_manager() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SettlementManagerContract);
        let client = SettlementManagerContractClient::new(&env, &contract_id);

        let stl_id = String::from_str(&env, "STL-5001");
        let dev_id = String::from_str(&env, "DEV-1001");

        assert!(client.create_settlement(&stl_id, &dev_id, &2500));
        assert!(client.execute_settlement(&stl_id));
        assert!(!client.execute_settlement(&stl_id));
    }
}
