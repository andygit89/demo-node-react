const env = process.env.NODE_ENV || 'development';
export let ENV;
export let MONGOOSE_DEBUG;
export let JWTSECRET;
export let DB;
export let PORT;



//switch the connection handles depending on the environment
switch(env){
  case 'development':
      ENV = 'development',
      MONGOOSE_DEBUG = true,
      JWTSECRET = '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
      DB = 'mongodb://localhost/apti-labs',
      PORT = 8080
      break;
   case 'production':
       ENV = 'production',
       MONGOOSE_DEBUG = true,
       JWTSECRET = '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
       DB = 'mongodb://localhost/apti-labs',
       PORT = 4040
       break;


}
