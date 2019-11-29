class FotballMaal{
  constructor(){
    this.x1 = width*0.05;
    this.x2 = width*0.95;
    this.y = height/2;
    this.bredde = width*0.05;
    this.lengde = height*0.25;
  }
  tegn(){
    rect(this.x1, this.y, this.bredde, this.lengde);
    rect(this.x2, this.y, this.bredde, this.lengde);
  }
}
