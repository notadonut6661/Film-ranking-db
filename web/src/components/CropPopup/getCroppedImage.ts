export default function getCroppedImage(): string {
  return (document.getElementById('canvas') as HTMLCanvasElement)?.toDataURL("image/jpeg", 0.6);
}
