import React from 'react';
import Block from '../Block/Block';
import { BLOCK_CATEGORIES } from '../../constants/blockTypes';

const BlockPalette = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex gap-2 mb-4">
        {Object.entries(BLOCK_CATEGORIES).map(([key, category]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`px-3 py-1 rounded ${
              activeCategory === key ? category.color + ' text-white' : 'bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        {BLOCK_CATEGORIES[activeCategory].blocks.map((block, index) => (
          <Block
            key={index}
            data={{ ...block, category: BLOCK_CATEGORIES[activeCategory] }}
            isInWorkspace={false}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockPalette;