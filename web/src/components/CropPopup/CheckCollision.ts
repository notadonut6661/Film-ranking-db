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

function CheckCollision(newFirstObject: DOMRect, secondObject: DOMRect, objectsRelationship: CollideableObjectsRelationship): CollisionCheckReturn {
  // if (Number(secondObject.getBoundingClientRect().top) <= newCropAreaPosition.top && Number(secondObject.bottom) >= newCropAreaPosition.bottom) { 
  //   return 0;
  // } else if (Number(secondObject.top) >= newCropAreaPosition.top) {
  //   return 0;
  // } else if (Number(secondObject.bottom) <= newCropAreaPosition.bottom) {
  //   return 0;
  // };

  // if (Number(secondObject.left) <= newCropAreaPosition.left && Number(secondObject.right) >= newCropAreaPosition.right) {
  //   return 0;
  // }
  // else if (Number(secondObject.left) >= newCropAreaPosition.left) {
  //   return 0;
  // } else if (Number(secondObject.right) <= newCropAreaPosition.right) {
  //   return 0;
  // };

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


  return canMove;
}