export default function getTextMaxLength (el: HTMLElement| null): number {
  if (!el) return 0;

  const maxRows = el.offsetHeight / (parseFloat(window.getComputedStyle(el).fontSize) + 3);

  return maxRows * 14;
} 
