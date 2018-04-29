import saveToken from './saveToken';


const refreshToken = (token) => {
  fetch('http://192.168.1.16:81/api/refresh_token.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.text())
  .then(newToken => saveToken(newToken));
};

export default refreshToken;
