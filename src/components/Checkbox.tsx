import { ReactNode, ChangeEventHandler } from 'react'

type Props = {
  children?: ReactNode | undefined
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function Checkbox({ children, checked, onChange }: Props) {
  return (
    <div className='flex items-center'>
      <label className='relative inline-block h-[16px] w-[16px] cursor-pointer rounded-sm border-[1px] border-primary-default'>
        <input
          type='checkbox'
          className='peer hidden'
          checked={checked}
          onChange={onChange}
        />
        <span
          className='absolute left-0 top-0 hidden h-full w-full bg-primary-default after:absolute after:left-[2px] after:top-[5px] after:inline-block after:h-[7px] after:w-[3px] after:rotate-[135deg] after:rounded-b-[10px] after:bg-gray-white peer-checked:inline-block'
          aria-hidden='true'
        ></span>
        <span
          className='absolute left-[7px] top-[2px] hidden h-[10px] w-[3px] rotate-[45deg] rounded-t-[10px] bg-gray-white peer-checked:inline-block'
          aria-hidden='true'
        ></span>
      </label>
      <span className='ml-[10px]'>{children}</span>
    </div>
  )
}
