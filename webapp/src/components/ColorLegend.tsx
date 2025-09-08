import React, { useContext, useMemo } from "react";
import { TanaHelperContext } from "../TanaHelperContext";
import './Visualizer.css';

const IS_TAG_LINK = 'itl';

export default function ColorLegend() {
  const { graphData } = useContext(TanaHelperContext);

  const items = useMemo(() => {
    if (!graphData) return [];
    const tagIds = new Set<string>();
    graphData.links?.forEach((link: any) => {
      const reason = link.reason;
      if (reason === IS_TAG_LINK) {
        const target = typeof link.target === 'object' ? link.target.id : link.target;
        tagIds.add(target);
      }
    });
    const legends: { color: string; name: string }[] = [];
    graphData.nodes?.forEach((node: any) => {
      if (tagIds.has(node.id) && node.color) {
        legends.push({ color: node.color, name: node.name });
      }
    });
    legends.sort((a, b) => a.name.localeCompare(b.name));
    return legends;
  }, [graphData]);

  if (items.length === 0) return null;

  return (
    <div className="color-legend">
      {items.map(item => (
        <div className="legend-item" key={item.name}>
          <span className="legend-color" style={{ backgroundColor: item.color }} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
