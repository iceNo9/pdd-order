// renderer.js
window.api.on('export-shopping-info', () => {
  window.api.send('get-page-source', null);
});
