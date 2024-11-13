export const executeBlock = async (block, setSprite) => {
    return new Promise((resolve) => {
      switch (block.type) {
        case 'move':
          setSprite(prev => ({
            ...prev,
            x: prev.x + block.values.n * Math.cos(prev.rotation * Math.PI / 180),
            y: prev.y + block.values.n * Math.sin(prev.rotation * Math.PI / 180)
          }));
          resolve();
          break;
  
        case 'turn_right':
          setSprite(prev => ({
            ...prev,
            rotation: prev.rotation + block.values.n
          }));
          resolve();
          break;
  
        case 'turn_left':
          setSprite(prev => ({
            ...prev,
            rotation: prev.rotation - block.values.n
          }));
          resolve();
          break;
  
        case 'goto':
          setSprite(prev => ({
            ...prev,
            x: block.values.x,
            y: block.values.y
          }));
          resolve();
          break;
  
        case 'show':
          setSprite(prev => ({ ...prev, isVisible: true }));
          resolve();
          break;
  
        case 'hide':
          setSprite(prev => ({ ...prev, isVisible: false }));
          resolve();
          break;
  
        case 'size':
          setSprite(prev => ({ ...prev, size: block.values.n }));
          resolve();
          break;
  
        case 'wait':
          setTimeout(resolve, block.values.n * 1000);
          break;
  
        default:
          resolve();
      }
    });
  };
  
  export const runProgram = async (blocks, setSprite, isRunning) => {
    for (const block of blocks) {
      if (!isRunning.current) break;
      await executeBlock(block, setSprite);
    }
  };