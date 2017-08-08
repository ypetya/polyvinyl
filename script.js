// Code goes here
window.addEventListener('load', onLoad);

function onLoad(e) {
  var canvas = document.getElementById('myCanvas'),
    drawer = new Drawer(canvas),
    runner = new Runner(canvas),
    uploader = new ImgLoader(uploaded),
    data =  convertFnToImageData(drawer.toString())
            .concat(convertFnToImageData(runner.toString()));

  // encode our code to an image
  drawer.encode(data, true);
  
  console.log('init done');

  function uploaded(image){
    console.log('New image selected!', image);
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image,0,0);
    
    console.log('Decoded message:', runner.decode());
  }
}


function convertFnToImageData(func) {
  var returnData = [],
    input = func.toString().split('');

  returnData = input.map(function(c) {
    return c.charCodeAt(0);
  });

  return returnData;
}