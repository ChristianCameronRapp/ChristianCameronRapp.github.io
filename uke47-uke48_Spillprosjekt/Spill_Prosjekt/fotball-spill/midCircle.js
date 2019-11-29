class MidCircle{
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.radius = width*0.1;
    this.farge = `#2bab18`;
  }
  tegn(){
    fill(this.farge);
    circle(this.x, this.y, this.radius);
  }
}
