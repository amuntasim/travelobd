Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '106632129690', '831445b60595b0873334f7e600306398'
  provider :twitter, '8xvqZNiJdohODv2P6WrMyQ', 'RfpIPDOgi12IOZJNYndzJwNoCAWmPNfSrAKfAAAiM'

end