import { CollideableObjectsRelationship } from "data/Interfaces/CollideableObjectsRelationship.enum";
import { CanMove } from "data/Interfaces/CanMove.interface";

export function CheckCollision(newFirstObject: DOMRect, secondObject: DOMRect, objectsRelationship: CollideableObjectsRelationship): CanMove {
  console.log(newFirstObject.top, secondObject.top)
  const canMove: CanMove = {
    bottom: false,
    left: false,
    right: false,
    top: false
  }; 

  if (CollideableObjectsRelationship.A_IN_B === objectsRelationship) {
    canMove.bottom = newFirstObject.bottom <= secondObject.bottom;
    canMove.top = newFirstObject.top > secondObject.top;
    canMove.left = newFirstObject.left >= secondObject.left;
    canMove.right = newFirstObject.right <= secondObject.right;
  } 

  if(CollideableObjectsRelationship.B_IN_A === objectsRelationship) {
    canMove.bottom = newFirstObject.bottom >= secondObject.bottom;
    canMove.top = newFirstObject.top <= secondObject.top;
    canMove.left = newFirstObject.left >= secondObject.left;
    canMove.right = newFirstObject.height <= secondObject.right;
  }

  if (CollideableObjectsRelationship.NOT_RELATED === objectsRelationship) {
    canMove.bottom = newFirstObject.bottom < secondObject.top || newFirstObject.right < secondObject.left || newFirstObject.left > secondObject.right || newFirstObject.top > secondObject.bottom;
    canMove.top = newFirstObject.top > secondObject.bottom || newFirstObject.right < secondObject.left || newFirstObject.left > secondObject.right ||  newFirstObject.bottom <= secondObject.top;
    canMove.left = newFirstObject.left <  secondObject.right || newFirstObject.bottom < secondObject.top || newFirstObject.top < secondObject.bottom || newFirstObject.right > secondObject.left; 
    canMove.right = newFirstObject.right < secondObject.left || newFirstObject.bottom < secondObject.top || newFirstObject.top < secondObject.bottom || newFirstObject.left > secondObject.right; 
  }

  return canMove;
}
