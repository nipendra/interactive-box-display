import React from 'react';
import './GridLayout.css';

interface Box {
  id: number;
  isGreen: boolean;
}

interface GridLayoutProps {
  boxes: Box[];
  onBoxClick: (boxId: number) => void;
  isReverting: boolean 
}

const GridLayout: React.FC<GridLayoutProps> = ({ boxes, onBoxClick, isReverting }) => {

  const totalBox = boxes.length;
  const columns = Math.ceil(Math.sqrt(totalBox));
  return (
    <div 
      className="grid-container"
      style={{ gridTemplateColumns: `repeat(${columns}, 50px)`}}
      >
      {boxes.map((box) => (
        <button
          key={box.id}
          onClick={() => onBoxClick(box.id)}
          disabled={ box.isGreen || isReverting}
          className={`box ${box.isGreen ? 'green' : 'red'}`}
          style={{
            cursor: (box.isGreen || isReverting) ? "not-allowed" : "pointer",
          }}
        >
        </button>
      ))}
    </div>
  );
};

export default GridLayout;