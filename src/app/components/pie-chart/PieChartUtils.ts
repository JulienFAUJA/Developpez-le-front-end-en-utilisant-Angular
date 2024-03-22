export class PieChartUtils {
    /**
     * Positionne chaque texte à sa place par rapport à la position de son tooltip
     * mais prend en compte les éléments suivants pour gérer le responsive:
     * sa position (du tooltip) par rapport aux moitié width et height.
     * @param index L'index de l'élément dans le dataset
     * @param tooltipPoint Le tooltip de l'élément
     * @param halfWidth La moitié de la largeur
     * @param halfHeight La moitié de la hauteur
     * @param rectBox La box du contenu
     * @returns La position du texte actuel
     */
    set_text_position(index: number, tooltipPoint: Point, halfWidth: number, halfHeight: number, rectBox: RectBox): Point {
        const left_half: boolean = tooltipPoint.x < halfWidth ? true : false;
        const upper_half: boolean = tooltipPoint.y < halfHeight ? true : false;
        let text_x: number;
        let text_y: number;
        const offset_value: number = 15;
        let offset_x: number = index % 2 == 0 ? -offset_value : offset_value;
  
        if (left_half === true) {
          if (index === 0 || index === 1) text_x = halfWidth + offset_x;
          else text_x = halfWidth / 3 + offset_x;
        } else {
          if (index <= 2) {
            text_x = rectBox.right - Math.abs(rectBox.right - halfWidth) / 3 + offset_x;
          } else {
            text_x = halfWidth / 4 + offset_x;
          }
        }
        if (upper_half === true) {
          if (index === 0) {
            text_y = rectBox.top + 10;
          } else if (index === 1) {
            text_y = tooltipPoint.y - 10;
          } else {
            text_y = tooltipPoint.y - 30;
          }
        } else {
          switch (index) {
            case 0:
              text_y = tooltipPoint.y - 15;
              break;
            case 1:
              text_y = tooltipPoint.y - 10;
              break;
            case 2:
              text_y =
                rectBox.bottom - Math.abs(rectBox.bottom - tooltipPoint.y) / 2 +
                5;
              break;
            case 3:
              text_y = tooltipPoint.y;
              break;
            default:
              text_y = tooltipPoint.y - 15;
              break;
          }
        }
        return {x: text_x, y: text_y} as Point;
      }
}