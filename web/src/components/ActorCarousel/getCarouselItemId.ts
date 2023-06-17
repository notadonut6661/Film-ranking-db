export const getCarouselItemId = (CarouselItemLocalStorageKey: string): number => {
  const [actorId] = CarouselItemLocalStorageKey.split('-').reverse();
  return parseInt(actorId);
};
