import React from 'react';
import './CShapeLayout.css';

interface Box {
  id: number;
  isGreen: boolean;
}

interface CShapeLayoutProps {
  boxes: Box[];
  onBoxClick: (boxId: number) => void;
  isReverting: boolean;
}

const CShapeLayout: React.FC<CShapeLayoutProps> = ({ boxes, onBoxClick, isReverting }) => {
  const calculateCShape = (totalBoxes: number) => {
    let top = Math.floor(totalBoxes / 4);
    top = Math.max(top, 1); // ensure at least 1
    const bottom = top;
    const middle = totalBoxes - top - bottom;

    return { top, middle, bottom };
  };

  function calculatePatternDimensions(boxsCount:number) {

    const W = Math.floor((boxsCount + 1) / 3);

    const N_ideal = (3 * W) - 1;

    const N_remainder = boxsCount - N_ideal;

    const H = (W + 1) + N_remainder;

    return { width: W, height: H };
}


const {width, height} = calculatePatternDimensions(boxes.length);

console.log(width, height, "ff");

function generatePatternString(width: number, height: number) {
    let boxIndex = 0;
    const rows = [];
    const topRow = [];
    for (let i = 0; i < width && boxIndex < boxes.length; i++) {
      const box = boxes[boxIndex++];
      topRow.push(
        <button
          key={box.id}
          onClick={() => onBoxClick(box.id)}
          disabled={box.isGreen || isReverting}
          className={`box ${box.isGreen ? 'green' : 'red'}`}
        />
      );
    }

    rows.push(<div key="top" className="c-row">{topRow}</div>);


    for (let i = 0; i < height-2 && boxIndex < boxes.length; i++) {
      const box = boxes[boxIndex++];
      rows.push(
        <div key={`middle-${box.id}`} className="c-row">
          <button
            onClick={() => onBoxClick(box.id)}
            disabled={box.isGreen || isReverting}
            className={`box ${box.isGreen ? 'green' : 'red'}`}
          />
        </div>
      );
    }

    const bottomRow = [];
    for (let i = 0; i < width && boxIndex < boxes.length; i++) {
      const box = boxes[boxIndex++];
        bottomRow.push(
          <button
            key={box.id}
            onClick={() => onBoxClick(box.id)}
            disabled={box.isGreen || isReverting}
            className={`box ${box.isGreen ? 'green' : 'red'}`}
          />
        );
    }
    rows.push(<div key="bottom" className="c-row">{bottomRow}</div>);

    return rows;
}


  return <div className="c-shape-container">{generatePatternString(width,height)}</div>;
};

export default CShapeLayout;
