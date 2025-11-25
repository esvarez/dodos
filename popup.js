// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const actionBtn = document.getElementById('actionBtn');
  const output = document.getElementById('output');

  // Button click handler
  actionBtn.addEventListener('click', function() {
    output.textContent = 'Button clicked at ' + new Date().toLocaleTimeString();
  });
});
