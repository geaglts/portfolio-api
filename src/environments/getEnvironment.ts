import { availableEnvs } from './availableEnvs';

function getEnvironment(env = 'dev') {
  return availableEnvs[env] || availableEnvs.dev;
}

export default getEnvironment;
