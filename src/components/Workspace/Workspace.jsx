import React from 'react';
import Block from '../Block/Block';
import { Play, Pause } from 'lucide-react';

const Workspace = ({ 
  blocks, 
  onBlockAdd,  // Added this prop
  onBlockRemove, 
  onBlockParameterChange,
  onRun,
  onStop,
  isRunning 
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const blockData = JSON.parse(e.dataTransfer.getData('block'));
      onBlockAdd(blockData);  // Now this is properly defined
    } catch (err) {
      console.error('Failed to parse dropped block data:', err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Code</h2>
        <div className="flex gap-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isRunning ? 'bg-gray-400' : 'bg-green-500'
            } text-white`}
          >
            <Play size={20} />
            Run
          </button>
          <button
            onClick={onStop}
            disabled={!isRunning}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              !isRunning ? 'bg-gray-400' : 'bg-red-500'
            } text-white`}
          >
            <Pause size={20} />
            Stop
          </button>
        </div>
      </div>
      
      <div 
        className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {blocks.map((block, index) => (
          <Block
            key={index}
            data={block}
            onRemove={() => onBlockRemove(index)}
            onParameterChange={(type, values) => onBlockParameterChange(index, values)}
            isInWorkspace={true}
          />
        ))}
        {blocks.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400">
            Drag blocks here to build your program
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;