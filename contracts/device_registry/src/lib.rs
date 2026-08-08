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
