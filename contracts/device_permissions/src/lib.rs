#![no_std]
use soroban_sdk::{contract, contractimpl, Env, String};

#[contract]
pub struct DevicePermissionsContract;

#[contractimpl]
impl DevicePermissionsContract {
    pub fn authorize_device(env: Env, device_id: String, role: String) -> bool {
        env.storage().instance().set(&device_id, &role);
        true
    }

    pub fn revoke_authorization(env: Env, device_id: String) -> bool {
        if env.storage().instance().has(&device_id) {
            env.storage().instance().remove(&device_id);
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
    fn test_device_permissions() {
        let env = Env::default();
        let contract_id = env.register_contract(None, DevicePermissionsContract);
        let client = DevicePermissionsContractClient::new(&env, &contract_id);

        let dev_id = String::from_str(&env, "DEV-1001");
        let role = String::from_str(&env, "ADMIN");

        assert!(client.authorize_device(&dev_id, &role));
        assert!(client.revoke_authorization(&dev_id));
        assert!(!client.revoke_authorization(&dev_id));
    }
}
