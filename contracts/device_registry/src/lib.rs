#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, String};

#[contract]
pub struct DeviceRegistryContract;

#[contractimpl]
impl DeviceRegistryContract {
    pub fn register_device(env: Env, device_id: String, _owner: String, metadata: String) -> bool {
        env.storage().instance().set(&device_id, &metadata);
        true
    }

    pub fn update_metadata(env: Env, device_id: String, metadata: String) -> bool {
        if env.storage().instance().has(&device_id) {
            env.storage().instance().set(&device_id, &metadata);
            return true;
        }
        false
    }

    pub fn set_device_status(env: Env, _device_id: String, active: bool) -> bool {
        env.storage().instance().set(&symbol_short!("status"), &active);
        true
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::String;

    #[test]
    fn test_device_registry() {
        let env = Env::default();
        let contract_id = env.register_contract(None, DeviceRegistryContract);
        let client = DeviceRegistryContractClient::new(&env, &contract_id);

        let dev_id = String::from_str(&env, "DEV-1001");
        let owner = String::from_str(&env, "G12345");
        let meta = String::from_str(&env, "EV_Charger");

        assert!(client.register_device(&dev_id, &owner, &meta));

        let new_meta = String::from_str(&env, "EV_Charger_V2");
        assert!(client.update_metadata(&dev_id, &new_meta));

        assert!(client.set_device_status(&dev_id, &true));
    }
}
