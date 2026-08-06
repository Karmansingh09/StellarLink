export const loginService = async (credentials) => {
  return {
    user: {
      id: 'usr_8921',
      name: 'Enterprise Architect',
      email: credentials.email || 'admin@stellarlink.io',
      role: 'SuperAdmin',
    },
    token: 'jwt_mock_token_stellarlink_enterprise_auth_2026',
    expiresIn: '24h',
  };
};

export const getSessionService = async (token) => {
  return {
    authenticated: true,
    user: {
      id: 'usr_8921',
      name: 'Enterprise Architect',
      email: 'admin@stellarlink.io',
      role: 'SuperAdmin',
    },
  };
};
