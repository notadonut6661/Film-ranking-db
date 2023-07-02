enum CollisionCheckReturn {

}

class CollideableObject {
  constructor() {

  }

  public get position() {
    return '';
  } 

  public checkCollision(secondObject: DOMRect | CollideableObject): CollisionCheckReturn {
    return 0;
  }
}
 