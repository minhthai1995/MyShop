const initData = () => (
  fetch('http://192.168.1.11:81/api/index.php')  // eslint-disable-line
  .then(res => res.json())
);

export default initData;
