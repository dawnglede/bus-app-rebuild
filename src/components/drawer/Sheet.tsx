import { useDraggable } from '@dnd-kit/core'
import classNames from 'classnames'

import { Header } from './Header'
import { MAX_DRAWER_HEIGHT_PERCENT } from './modifiers'

interface Props {
  children: React.ReactNode
  expanded?: boolean
  header: React.ReactNode
  height?: number
}

const styles = {
  sheet:
    'relative bg-gray-white rounded-t-[12px] flex flex-col w-full after:content-[""] after:block after:absolute after:bottom-[1px] after:w-full after:h-full after:translate-y-[100%] after:bg-[#fefefe] max-w-[512px]',
  dragging: 'transision-none',
  expanded: 'translate-x-0 translate-y-[var(--transfrom)] translate-z-0',
}

export function Sheet({ children, expanded, header }: Props) {
  const { attributes, isDragging, listeners, transform, setNodeRef } =
    useDraggable({
      id: 'header',
    })
  const style: React.CSSProperties = {
    transform: expanded ? 'translateY(var(--transform))' : undefined,
    transition: isDragging ? 'none' : 'initial',
  }
  return (
    <div
      className={classNames(styles.sheet, 'sheet')}
      style={
        {
          '--max-height': `${MAX_DRAWER_HEIGHT_PERCENT * 100}vh`,
          '--transform': transform ? `${transform.y}px` : undefined,
          ...style,
        } as React.CSSProperties
      }
    >
      <Header ref={setNodeRef} {...attributes} {...listeners}>
        {header ?? <div></div>}
      </Header>
      <div
        className='scroll-style mb-[10px] mr-[3px] block overflow-y-auto bg-[#fefefe]'
        style={{
          minHeight: transform
            ? 'calc(var(--max-height) - 40vh)'
            : 'var(--header-height)',
          maxHeight: 'calc(var(--max-height) - 10vh)',
          height: transform ? '' : expanded ? '' : 'var(--header-height)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
