// Code goes here
window.addEventListener('load', onLoad);

function onLoad(e) {
  var canvas = document.getElementById('myCanvas'),
    drawer = new Drawer(canvas),
    runner = new Runner(canvas),
    uploader = new ImgLoader(uploaded);

  drawer.encodeClasses(Drawer, Runner, ImgLoader);

  console.log('init done');

  function uploaded(image) {
    console.log('New image selected!', image);
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    runner = new Runner(canvas);
    console.log('Decoded message:', runner.decode());
  }
}