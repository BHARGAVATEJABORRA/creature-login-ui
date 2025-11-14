import { useEffect, useState } from 'react';

interface GazeProps {
  ref: React.RefObject<SVGCircleElement>;
}

export const useGaze = ({ ref }: GazeProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;

      const eye = ref.current;
      const svg = eye.ownerSVGElement;
      if (!svg) return;

      const pt = svg.createSVGPoint();
      pt.x = 'touches' in event ? event.touches[0].clientX : event.clientX;
      pt.y = 'touches' in event ? event.touches[0].clientY : event.clientY;

      const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
      const eyeX = eye.cx.baseVal.value;
      const eyeY = eye.cy.baseVal.value;

      const dx = svgPt.x - eyeX;
      const dy = svgPt.y - eyeY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      setRotation(angle);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [ref]);

  return rotation;
};
