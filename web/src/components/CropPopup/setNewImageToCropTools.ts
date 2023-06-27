export default function setNewImageToCropTools(rawImage: File): void {
  const url = URL.createObjectURL(rawImage);
  const ctx = (document.getElementById('crop-canvas') as HTMLCanvasElement).getContext('2d');
  const newImage = new Image(); 
  newImage.src = url;
  
  ctx?.drawImage(newImage, 0, 0);
}
