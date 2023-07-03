interface CollisionCheckReturn {
  FirstCollidesSecond: {
    bottom: boolean,
    top: boolean,
    left: boolean,
    right: boolean
  },
  SecondCollidesFirst: {
    bottom: boolean,
    top: boolean,
    left: boolean,
    right: boolean
  },
}

enum CollideableObjectsRelationship {
  A_IN_B=0,
  B_IN_A,
  NOT_RELATED
}

function CheckCollision<F extends HTMLElement, S extends HTMLElement>(firstObject: F, secondObject: S, objectsRelationship: CollideableObjectsRelationship): CollisionCheckReturn {
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

  const result: CollisionCheckReturn = {
    FirstCollidesSecond: {
      bottom: false,
      left: false,
      right: false,
      top: false
    },
    SecondCollidesFirst: {
      bottom: false,
      left: false,
      right: false,
      top: false
    }
  };

  Object.entries(firstObject.getBoundingClientRect()).map(([key, value]: [string, number]) => {
    if ('bottom' === key || 'left' === key || 'right' === key || 'top' === key)  {
      result.FirstCollidesSecond[key] = value > secondObject.getBoundingClientRect()[key] || ;
      result.SecondCollidesFirst[key] = value > secondObject.getBoundingClientRect()[key];
    }
  })
  //  const value = firstObject.getBoundingClientRect()[el];
   
  //  if (Object.keys(result.FirstInSecond).includes(el))  {
  //   result.FirstInSecond[el] = 0;
  //  }
  // }

  return result;
}