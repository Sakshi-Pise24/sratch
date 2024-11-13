import React, { useRef, useEffect, useCallback } from 'react';
import { RefreshCcw } from 'lucide-react';

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;

const Stage = ({ sprite, onReset }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    drawGrid();
  }, []); // Empty dependency array, only runs on mount

  // Memoize the drawSprite function to prevent unnecessary rerenders
  const drawSprite = useCallback(() => {
    const context = contextRef.current;
    context.save();
    context.translate(
      sprite.x + CANVAS_WIDTH/2,
      -sprite.y + CANVAS_HEIGHT/2
    );
    context.rotate((sprite.rotation * Math.PI) / 180);

    // Draw cat sprite (simplified)
    const scaledSize = sprite.size * 0.5;
    context.fillStyle = '#FF9000';
    context.beginPath();
    context.ellipse(0, 0, scaledSize, scaledSize * 0.7, 0, 0, 2 * Math.PI);
    context.fill();

    // Draw face
    context.fillStyle = '#000';
    context.beginPath();
    context.arc(-scaledSize/3, -scaledSize/4, scaledSize/6, 0, 2 * Math.PI);
    context.arc(scaledSize/3, -scaledSize/4, scaledSize/6, 0, 2 * Math.PI);
    context.fill();

    context.restore();
  }, [sprite]); // Only re-create drawSprite when sprite changes

  useEffect(() => {
    if (!contextRef.current) return;
    drawGrid();
    if (sprite.isVisible) {
      drawSprite();
    }
  }, [sprite, drawSprite]); // Include drawSprite in dependency array

  const drawGrid = () => {
    const context = contextRef.current;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid
    context.strokeStyle = '#ddd';
    context.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= CANVAS_WIDTH; x += 40) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, CANVAS_HEIGHT);
      context.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= CANVAS_HEIGHT; y += 40) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(CANVAS_WIDTH, y);
      context.stroke();
    }

    // Draw axes
    context.strokeStyle = '#999';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(CANVAS_WIDTH/2, 0);
    context.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
    context.moveTo(0, CANVAS_HEIGHT/2);
    context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT/2);
    context.stroke();
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Stage</h2>
        <button
          onClick={onReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <RefreshCcw size={20} />
          Reset
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="bg-white rounded-lg"
      />
    </div>
  );
};

export default Stage;
