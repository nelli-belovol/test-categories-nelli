export function calculateOffset(
  elementRef: React.RefObject<HTMLElement>,
  parentRef: React.RefObject<HTMLElement>,
  scaleValue: number,
  isLeft = true,
): number {
  const element = elementRef.current;
  const parentElement = parentRef.current;

  if (!element || !parentElement) return 0;

  const elementRect = element.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();

  const offsetX = isLeft
    ? elementRect.left - parentRect.left
    : elementRect.right - parentRect.right;

  const halfWidth = elementRect.width / 2;
  return (offsetX + halfWidth) / scaleValue;
}
