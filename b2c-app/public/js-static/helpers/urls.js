function getB2CLink (action) {
    var clientId = '488c321f-10e4-48f2-b9c2-261e2add2f8d'; 

    var actionURL;

    switch(action){
        case 'signup':
            actionURL = 'B2C_1A_account_signup';
            break;
        case 'login':
            actionURL = 'B2C_1A_signin_invitation';
            break;
        case 'reset-password':
            actionURL = 'B2C_1A_passwordreset';
            break;
        default:
            //point to login page by default
            actionURL = 'B2C_1A_signin_invitation';
            break;
    }

    var relativePath = `authorize?p=${actionURL}&client_id=${clientId}&nonce=defaultNonce` + 
        `&redirect_uri=__redirectURI__&scope=openid&response_type=id_token&prompt=login`;

    return relativePath;

}