document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("li[data-img], span[data-img]");
  const preview = document.getElementById("preview");
  const previewImg = document.getElementById("preview-img");

  items.forEach(item => {
    item.addEventListener("mouseenter", (e) => {
      const imgName = item.dataset.img;
      if (imgName) {
        previewImg.src = `./gallery/${imgName}`;
        preview.style.display = "block";
        positionPreview(e);
      }
    });

    item.addEventListener("mousemove", (e) => {
      positionPreview(e);
    });

    item.addEventListener("mouseleave", () => {
      preview.style.display = "none";
    });
  });

  function positionPreview(e) {
    const offsetX = 20;
    const offsetY = -70; // Posición arriba del cursor
    const previewWidth = 120;
    const previewHeight = 120;
    
    let left = e.clientX + offsetX;
    let top = e.clientY + offsetY;
    
    // Verificar si la imagen se sale por la derecha
    if (left + previewWidth > window.innerWidth) {
      // Colocar a la izquierda del cursor
      left = e.clientX - previewWidth - offsetX;
    }
    
    // Ajustar si se sale por arriba
    if (top < 0) {
      top = e.clientY + 20; // Si no hay espacio arriba, mostrar abajo
    }
    
    preview.style.left = left + "px";
    preview.style.top = top + "px";
  }

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