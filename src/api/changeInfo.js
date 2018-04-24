const changeInfo = (token, name, phone, address) => (
  fetch('http://192.168.1.13:81/api/change_info.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token, name, phone, address })
  })
  .then(res => res.json())
);

module.exports = changeInfo;
