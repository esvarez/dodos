// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const actionBtn = document.getElementById('actionBtn') as HTMLButtonElement;
  const output = document.getElementById('output') as HTMLDivElement;

  // Button click handler
  actionBtn?.addEventListener('click', function() {
    if (output) {
      output.textContent = 'Button clicked at ' + new Date().toLocaleTimeString();
    }
  });
});
