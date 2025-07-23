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
  return (
    <div className="grid-container">
      {boxes.map((box) => (
        <button
          key={box.id}
          onClick={() => onBoxClick(box.id)}
          disabled={ box.isGreen || isReverting}
          className={`box ${box.isGreen ? 'green' : 'red'}`}
        >
        </button>
      ))}
    </div>
  );
};

export default GridLayout;