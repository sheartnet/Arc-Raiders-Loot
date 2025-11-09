document.addEventListener("DOMContentLoaded", () => {
  // Value Tabs Functionality
  const valueTabs = document.querySelectorAll('.value-tab');
  const valueContents = document.querySelectorAll('.value-content');

  valueTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetValue = tab.dataset.value;
      
      // Remove active class from all tabs and contents
      valueTabs.forEach(t => t.classList.remove('active'));
      valueContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.querySelector(`.value-content[data-content="${targetValue}"]`).classList.add('active');
    });
  });
});