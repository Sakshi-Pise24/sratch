import React, { useState, useRef } from 'react';
import BlockPalette from './components/BlockPalette/BlockPalette';
import Workspace from './components/Workspace/Workspace';
import Stage from './components/Stage/Stage';
import { runProgram } from './utils/blockExecutor';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('motion');
  const [workspace, setWorkspace] = useState([]);
  const [sprite, setSprite] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    size: 100,
    isVisible: true
  });
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);

  const handleBlockAdd = (blockData) => {
    setWorkspace(prev => [...prev, blockData]);
  };

  const handleBlockRemove = (index) => {
    setWorkspace(prev => prev.filter((_, i) => i !== index));
  };

  const handleBlockParameterChange = (index, values) => {
    setWorkspace(prev => prev.map((block, i) => 
      i === index ? { ...block, values } : block
    ));
  };

  const handleRun = async () => {
    setIsRunning(true);
    isRunningRef.current = true;
    await runProgram(workspace, setSprite, isRunningRef);
    setIsRunning(false);
    isRunningRef.current = false;
  };

  const handleStop = () => {
    setIsRunning(false);
    isRunningRef.current = false;
  };

  const handleReset = () => {
    setSprite({
      x: 0,
      y: 0,
      rotation: 0,
      size: 100,
      isVisible: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Scratch Clone</h1>
        
        <div className="flex gap-4">
          <div className="w-1/3">
            <BlockPalette
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          
          <div className="w-1/3">
          <Workspace
              blocks={workspace}
              onBlockAdd={handleBlockAdd}  // Make sure this prop is passed
              onBlockRemove={handleBlockRemove}
              onBlockParameterChange={handleBlockParameterChange}
              onRun={handleRun}
              onStop={handleStop}
              isRunning={isRunning}
          />
          </div>
          
          <div className="w-1/3">
            <Stage
              sprite={sprite}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;