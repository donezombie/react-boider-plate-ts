const CLIENT_ID = 'OHkciy5pLzkc7Xyq7eRKk0tA';
const REDIRECT_URI = 'localhost:5173/callbacks';

const URL = `https://authorization-server.com/authorize?
response_type=code
&client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URI}
&scope=openid+profile+email+photos
&state=V_oBCCkAP8Yh8-kZ
&nonce=79HuTeGGadyYsrPl`;

class OAuth {}

export default new OAuth();
