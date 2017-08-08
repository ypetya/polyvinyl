function ImgLoader(onImageLoadedCb){
  this.onImageLoadedCb = onImageLoadedCb;
  // Create <input type="file" id="file"  accept="image/*">
  this.input=document.createElement('INPUT');
  this.input.type='file';
  this.input.id='file';
  this.input.accept='image/*';
  document.body.appendChild(this.input);
  this.input.addEventListener('change', this.onFileInputChange.bind(this));
}

ImgLoader.prototype.onFileInputChange = function() {
  var file = this.input.files[0];
  var reader = new FileReader();
  reader.addEventListener('load', this.onFileLoad.bind(this));
  reader.readAsDataURL(file);
}

ImgLoader.prototype.onFileLoad = function(e) {
    this.img = getImage();
    this.img.addEventListener('load', this.onImageLoad.bind(this));
    this.img.src = e.target.result;
}

ImgLoader.prototype.onImageLoad = function() {
  this.onImageLoadedCb(this.img);
}

function getImage(){
  var img=document.getElementById('image');
  if(!img){
    img = document.createElement('IMG');
    document.body.appendChild(img);
  }
  return img;
}
