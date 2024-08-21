const { ipcRenderer } = require('electron');

document.getElementById('fetch-orders-btn').addEventListener('click', () => {
  // 当按钮被点击时，向主进程发送消息
  ipcRenderer.send('fetch-orders');
});

ipcRenderer.on('orders-fetched', (event, orders) => {
  // 接收主进程发送的订单信息
  console.log(orders); // 您可以根据需要在这里处理订单信息
});
