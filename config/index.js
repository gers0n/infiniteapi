const ENVIROMENTS = {
  development: 'dev',
  production: 'prod',
  qa:'qa'
};
const __ENV__ = ENVIROMENTS.development; /* dev/qa/prod */


if( __ENV__ === ENVIROMENTS.development) {
  import config from './config.dev'
}  else if( __ENV__ === ENVIROMENTS.production) {
  import config from './config.prod'
}