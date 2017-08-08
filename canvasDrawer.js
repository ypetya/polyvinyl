var VERSION = 1;

function Drawer(canvas){
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext("2d");
  this.imageData = this.ctx.createImageData(1,1);
}

Drawer.prototype.putPixel = function(x,y,r,g,b,a){
  this.imageData.data[0]=r;
  this.imageData.data[1]=g;
  this.imageData.data[2]=b;
  this.imageData.data[3]=a;
  
  this.ctx.putImageData( this.imageData, x, y);
}

Drawer.prototype.pushPixel = function(r,g,b,a){
  this.determineNextPixel();
  // Defaults
  g = g===undefined ? rnd() : g;
  b = b===undefined ? rnd() : b;
  a = a===undefined ? 255 : a;

  this.putPixel(this.x,this.y, r,g,b,a);
}

Drawer.prototype.encode = function(array, resize){
  var self=this, len=array.length;
  resize && this.resize(len);
  
  console.log('Encoding length:', len);
  if(len>=256*256*256) throw 'Too large input!';
  
  this.pushPixel(VERSION);
  this.pushPixel(len%256, Math.floor(len/256)%256, Math.floor(len/(256*256))%256);

  array.forEach(function(d){
    self.pushPixel(d);
  });
}

Drawer.prototype.determineNextPixel = function() {
  if(this.x===undefined)  {
    this.x = this.y = 0;
  } else {
    this.x++;
    if(this.x >= this.width) {
      this.x=0;
      this.y++;
    }
  }
}

Drawer.prototype.resize = function(newSize) {
  var dim=Math.ceil(Math.sqrt(newSize));
  this.width = this.height = this.canvas.width = this.canvas.height = dim;
  this.ctx = this.canvas.getContext("2d");
  this.imageData = this.ctx.createImageData(1,1);
}

function rnd(){
  return Math.floor(Math.random()*80+80);
}

Drawer.prototype.toString = function() {
  var str=Drawer.prototype.constructor.toString() + '\n';
  for(var i in Drawer.prototype) {
    str += 'Drawer.prototype.'+i+' = ' + Drawer.prototype[i].toString() + '\n';
  }
  return str;
}