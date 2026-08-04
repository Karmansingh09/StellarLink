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
