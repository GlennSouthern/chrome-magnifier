
function createMag() {
  var mag = document.createElement("canvas");
  mag.id = "chromeMagnifier";
  mag.style.width = '200px';
  mag.style.height = '150px';
  mag.style['background-color'] = '#000';
  mag.style.position = 'fixed';
  mag.style['z-index'] = 2147483647;
  mag.style.right = '40px';
  mag.style.top = '40px';
  document.body.appendChild(mag);
}

createMag();
