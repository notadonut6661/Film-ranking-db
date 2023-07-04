interface CollisionCheckReturn {
  bottom: boolean,
  top: boolean,
  left: boolean,
  right: boolean
}

enum CollideableObjectsRelationship {
  A_IN_B = 0,
  B_IN_A,
  NOT_RELATED
}

export function CheckCollision(newFirstObject: DOMRect, secondObject: DOMRect, objectsRelationship: CollideableObjectsRelationship): CollisionCheckReturn {
  const canMove: CollisionCheckReturn = {
    bottom: false,
    left: false,
    right: false,
    top: false
  }; 

  if (CollideableObjectsRelationship.A_IN_B === objectsRelationship) {
    canMove.bottom = newFirstObject.bottom <= secondObject.bottom;
    canMove.top = newFirstObject.top >= secondObject.top;
    canMove.left = newFirstObject.left <= secondObject.left;
    canMove.right = newFirstObject.height >= secondObject.right;
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
