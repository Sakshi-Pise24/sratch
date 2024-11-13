import React, { useState } from 'react';
import { X } from 'lucide-react';

const Block = ({ data, onRemove, isInWorkspace, onParameterChange }) => {
  const [values, setValues] = useState({
    n: data.defaultValue,
    x: data.defaultX,
    y: data.defaultY
  });

  const handleValueChange = (key, value) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    if (onParameterChange) {
      onParameterChange(data.type, newValues);
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('block', JSON.stringify({
      ...data,
      values
    }));
  };

  const renderParameters = () => {
    const parts = data.label.split(/\{([^}]+)\}/);
    return parts.map((part, index) => {
      if (['n', 'x', 'y'].includes(part)) {
        return (
          <input
            key={index}
            type="number"
            value={values[part]}
            onChange={(e) => handleValueChange(part, Number(e.target.value))}
            className="w-16 px-1 mx-1 text-black rounded"
          />
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`${data.category.color} text-white p-3 rounded-lg flex items-center justify-between 
                 ${isInWorkspace ? 'mb-2' : 'cursor-move'}`}
      draggable={!isInWorkspace}
      onDragStart={handleDragStart}
    >
      <div className="flex items-center gap-2">
        {renderParameters()}
      </div>
      {isInWorkspace && (
        <button onClick={onRemove} className="text-white hover:text-red-200">
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default Block;