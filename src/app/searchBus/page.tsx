'use client'
import Image from 'next/image'
import SearchIcon from '../../../public/search-icon.svg'
import CloseIcon from '../../../public/close-style2.svg'
import Checkbox from '@/components/Checkbox'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import SearchList from '@/components/SearchList'
import SideMenu from '@/components/SideMenu'
import useStore from '@/store/useStore'
import useCityCode from '@/hooks/useCityCode'
import getRoute from '../api/getRoute'
import { debounce } from '@/utils/tools'

export default function SearchBus() {
  const getCityCode = useCityCode()
  const { cityCode } = useStore()
  const [checked, setChecked] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [selectCity, setSelectCity] = useState<{[key: string]: string}>({})
  const [busRoute, setBusRoute] = useState<Array<{[key: string]: any}>|null>(null)
  const [tempBusRoute, setTempBusRoute] = useState<Array<{[key: string]: any}>|null>(null)
  const [isFilterLowFloor, setIsFilterLowFloor] = useState<boolean>(false)
  const handleCheckStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    setIsFilterLowFloor(e.target.checked)
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }
  const handleSelectCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCity({
      city: e.target.value,
      cityName: e.target.selectedOptions[0].text
    })
  }
  const handleCleanInput = () => {
    setKeyword('')
    setBusRoute(null)
  }
  const getBusRoute = (payload: Array<string>) => {
    const [cityName, keyword] = payload
    setBusRoute(null)
    getRoute({
      cityName,
      keyword
    }).then((res) => {
      setBusRoute(res)
      setTempBusRoute(res)
    })
  }
  const handleFilterLowFloor = () => {
    if (isFilterLowFloor) {
      const filterRoute = busRoute ? busRoute.filter(route => {
        const { TimeTables = [] } = route
        return TimeTables[0]?.IsLowFloor === true
      }) : null
      setBusRoute(filterRoute)
    } else {
      setBusRoute(tempBusRoute)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const busDataDebounce = useCallback(debounce(getBusRoute, 3000), [])
  useEffect(() => {
    if (keyword !== '' && selectCity.city) {
      busDataDebounce(selectCity.city, keyword)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, selectCity.city])
  useEffect(() => {
    handleFilterLowFloor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterLowFloor])
  return (
    <div className='px-[16px]'>
      <SideMenu />
      <select className='mb-[12px] mt-[56px] bg-[transparent] text-2xl' onChange={handleSelectCityChange}>
        <option key='NONE' value=''>選擇縣市</option>
        {cityCode?.map((city) => (
          <option key={city.CityCode} value={city.City}>{city.CityName}</option>
        ))}
      </select>
      <div className='relative'>
        <input
          type='text'
          className='h-[56px] w-full rounded px-[13px] pl-[16px] shadow-md focus:outline-primary-default'
          value={keyword}
          onChange={handleInputChange}
          placeholder='請輸入公車路線/起訖站名'
        />
        {keyword === '' ? (
          <div className='absolute right-[18px] top-[50%] flex h-[24px] w-[24px] translate-y-[-50%] items-center justify-center'>
            <Image alt='search' src={SearchIcon} />
          </div>
        ) : (
          <Image
            alt='close'
            className='absolute right-[18px] top-[50%] translate-y-[-50%] cursor-pointer'
            src={CloseIcon}
            onClick={handleCleanInput}
          />
        )}
      </div>
      <div className='px-[4px] py-[8px] leading-7'>
        <Checkbox checked={checked} onChange={handleCheckStatus}>
          僅顯示提供無障礙的公車路線
        </Checkbox>
      </div>
      <div>
        <p className='text-sm text-gray-600'>
          {
            busRoute && busRoute.length > 0
              ? '搜尋結果'
              : '歷史搜尋'
          }
        </p>
        <SearchList
          data={busRoute}
          type='result'
          city={selectCity.cityName}
        />
      </div>
    </div>
  )
}
