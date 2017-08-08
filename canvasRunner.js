var VERSION=1;

function Runner(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");
}

Runner.prototype.decode = function(){
    var dataLength,
        stringData='';

    if(this.popPixel()===VERSION){
        this.popPixel();
        dataLength = this.data[0] + this.data[1]*256 + this.data[2]*256*256
        console.log('Decoding length:', dataLength);
        for(var i=0;i<dataLength;i++) stringData+= String.fromCharCode(this.popPixel());
    }

    return stringData;
}

Runner.prototype.popPixel = function(){
  this.determineNextPixel();
  this.data=this.ctx.getImageData(this.x,this.y,1,1).data;
  return this.data[0]; //TODO use r,g,b,a
}

Runner.prototype.determineNextPixel = function() {
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

Runner.prototype.toString = function() {
  var str= Runner.prototype.constructor.toString() + '\n';
  for(var i in Runner.prototype) {
    str += 'Runner.prototype.'+i+' = '+Runner.prototype[i].toString() + '\n';
  }
  return str;
}