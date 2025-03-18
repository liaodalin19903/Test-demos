import { useGraphEvent, useGraphStore } from '@antv/xflow';

const Connect = () => {
  const updateEdge = useGraphStore((state) => state.updateEdge);
  useGraphEvent('edge:connected', ({ edge }) => {
    updateEdge(edge.id, {
      animated: true,
    });
  });
  return null;
};

export { Connect };
