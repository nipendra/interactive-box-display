import React, { useState, useEffect } from 'react';
import './Index.css';
import GridLayout from '../components/GridLayout';
import CShapeLayout from '../components/CShapeLayout';
import RowLayout from '../components/RowLayout';

interface Box {
  id: number;
  isGreen: boolean;
  clickedTime: number | null;
}

type LayoutType = 'grid' | 'c-shape' | 'row';

const Index = () => {
  const [inputValue, setInputValue] = useState('');
  const [validN, setValidN] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [layoutType, setLayoutType] = useState<LayoutType>('grid');
  const [clickedBoxs, setClickedBoxs] = useState(0);
  const [isReverting, setIsReverting] = useState(false);

  const validateInput = (value: string) => {
    if (!value.trim()) {
      setError('');
      setValidN(null);
      return;
    }

    // Check if it's a valid number
    if (!/^\d+$/.test(value.trim())) {
      setError('Please enter a valid number (no letters or special characters)');
      setValidN(null);
      return;
    }

    const num = parseInt(value.trim(), 10);

    if (num < 5 || num > 25) {
      setError('Number must be between 5 and 25 (inclusive)');
      setValidN(null);
      return;
    }

    setError('');
    setValidN(num);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validateInput(value);
    setInputValue(value);
  };

  useEffect(() => {
    if (validN !== null) {
      const newBoxes: Box[] = Array.from({ length: validN }, (_, index) => ({
        id: index,
        isGreen: false,
        clickedTime: null,
      }));
      
      setBoxes(newBoxes);
    }
  }, [validN, layoutType]);



  useEffect(() => {
    if (clickedBoxs === boxes.length && boxes.length > 0) {
      setIsReverting(true);
      const sortedIndices = boxes
        .map((box, index) => ({ ...box, index }))
        .sort((a, b) => (b.clickedTime ?? 0) - (a.clickedTime ?? 0))
        .map(b => b.index);

      sortedIndices.forEach((index, i) => {
        setTimeout(() => {
          setBoxes(prev => {
            const updated = [...prev];
            updated[index].isGreen = false;
            updated[index].clickedTime = null;
            return updated;
          });
          setClickedBoxs(prev => prev - 1);
          if (i === sortedIndices.length - 1) {
            setIsReverting(false); // done reverting
          }
        }, (i+1) * 1000);
      });
    }
  }, [clickedBoxs, boxes.length]);

  const handleBoxClick = (boxId: number) => {
    setBoxes(prevBoxes => {
      const newBoxes = [...prevBoxes];
      const box = newBoxes[boxId];
      box.isGreen = true;
      box.clickedTime = Date.now();
      return newBoxes;
    });
    setClickedBoxs(prev=>prev+1);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1>Interactive Box Display</h1>
          <p>Enter a number between 5 and 25 to generate interactive boxes</p>
          
          <div className="input-section">
            <label htmlFor="box-count">Number of Boxes (5-25)</label>
            <input
              id="box-count"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a number between 5 and 25"
            />
            {error && <div className="error">{error}</div>}
          </div>

          <div className="layout-section">
            <label>Layout Type</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="grid"
                  checked={layoutType === 'grid'}
                  onChange={(e) => setLayoutType(e.target.value as LayoutType)}
                />
                Grid Layout
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="c-shape"
                  checked={layoutType === 'c-shape'}
                  onChange={(e) => setLayoutType(e.target.value as LayoutType)}
                />
                C-Shape Layout
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="row"
                  checked={layoutType === 'row'}
                  onChange={(e) => setLayoutType(e.target.value as LayoutType)}
                />
                Row Layout
              </label>
            </div>
          </div>

          {validN && (
            <div className="box-section">
              <div className="controls">
                <p>Click boxes to turn them green. When all are green, they'll revert to red in reverse order.</p>
              </div>
              
              <div style={{display:'flex', justifyContent:'center'}}>
                {layoutType === 'grid' ?
                  <GridLayout boxes={boxes} onBoxClick={handleBoxClick}  isReverting={isReverting}/> : 
                  layoutType === 'c-shape' ?
                  <CShapeLayout boxes={boxes} onBoxClick={handleBoxClick}  isReverting={isReverting}/> :
                  <RowLayout boxes={boxes} onBoxClick={handleBoxClick}  isReverting={isReverting}/>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;