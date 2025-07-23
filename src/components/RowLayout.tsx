import React from 'react';
import './RowLayout.css';

interface Box {
  id: number;
  isGreen: boolean;
}

interface RowLayoutProps {
  boxes: Box[];
  onBoxClick: (boxId: number) => void;
  isReverting: boolean;
}

const RowLayout: React.FC<RowLayoutProps> = ({ boxes, onBoxClick, isReverting}) => {
  return (
    <div className="row-container">
      {boxes.map((box) => (
        <button
          key={box.id}
          onClick={() => onBoxClick(box.id)}
          disabled={isReverting || box.isGreen}
          className={`box ${box.isGreen ? 'green' : 'red'}`}
        >
        </button>
      ))}
    </div>
  );
};

export default RowLayout;