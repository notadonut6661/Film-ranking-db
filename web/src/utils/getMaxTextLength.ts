export default function getTextMaxLength (el: HTMLElement| null): number {
  if (!el) return 0;

  console.log(el.offsetHeight / (parseFloat(window.getComputedStyle(el).fontSize) + 3))
  const maxRows = el.offsetHeight / (parseFloat(window.getComputedStyle(el).fontSize) + 3);

  return maxRows * 40;
} 
