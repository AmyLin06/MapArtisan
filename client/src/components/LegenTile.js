class LegendTile {
  constructor(title, color, isfor, textColor) {
    this.title = title;
    this.color = color;
    this.isfor = isfor;
    this.textColor = textColor != null ? textColor : "black";
  }
}
export default LegendTile;
