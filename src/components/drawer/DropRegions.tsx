import { useDroppable } from '@dnd-kit/core'

export enum Region {
  Collapse = 'collapse',
  Expand = 'expand',
}

const styles: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'grid',
  gridTemplateRows: '1.2fr 0.8fr',
  pointerEvents: 'none',
}

export function DropRegions() {
  const { active, setNodeRef: setExpandRegionNodeRef } = useDroppable({
    id: Region.Expand,
  })
  const { setNodeRef: setCollapseRegionRef } = useDroppable({
    id: Region.Collapse,
  })

  if (!active) {
    return null
  }

  return (
    <div style={styles}>
      <div ref={setExpandRegionNodeRef} />
      <div ref={setCollapseRegionRef} />
    </div>
  )
}
