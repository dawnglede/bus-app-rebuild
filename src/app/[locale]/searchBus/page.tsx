'use client'
import Image from 'next/image'
import Checkbox from '@/components/Checkbox'
import { ChangeEvent, useEffect, useState } from 'react'
import SearchList from '@/components/SearchList'
import useStore from '@/store/useStore'
import useCityCode from '@/hooks/useCityCode'
import getRoute from '../../api/getRoute'
import { useTranslation } from '@/app/i18n/clients'
import { useRouter } from 'next/navigation'
interface SearchBusProps {
  params: {
    locale: string
  }
  searchParams: { search: string; city: string }
}

export default function SearchBus({
  params: { locale },
  searchParams: { search, city },
}: SearchBusProps) {
  const { t } = useTranslation(locale, 'searchBus')
  const router = useRouter()
  useCityCode()
  const { cityCode = [] } = useStore()
  const [checked, setChecked] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [selectCity, setSelectCity] = useState<{ [key: string]: string }>({})
  const [busRoute, setBusRoute] = useState<Array<{
    [key: string]: any
  }> | null>(null)
  const [tempBusRoute, setTempBusRoute] = useState<Array<{
    [key: string]: any
  }> | null>(null)
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
      cityName: e.target.selectedOptions[0].text,
    })
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword !== '') {
      router.replace(
        `/${locale}/searchBus?search=${keyword}&city=${selectCity.city}`,
      )
    }
  }
  const handleCleanInput = () => {
    setKeyword('')
    setBusRoute(null)
  }
  const getBusRoute = (payload: Record<string, string>) => {
    const { cityName, keyword } = payload
    setBusRoute(null)
    getRoute({
      cityName,
      keyword,
    }).then((res) => {
      setBusRoute(res)
      setTempBusRoute(res)
    })
  }
  const handleFilterLowFloor = () => {
    if (isFilterLowFloor) {
      const filterRoute = busRoute
        ? busRoute.filter((route) => {
            const { TimeTables = [] } = route
            return TimeTables[0]?.IsLowFloor === true
          })
        : null
      setBusRoute(filterRoute)
    } else {
      setBusRoute(tempBusRoute)
    }
  }

  useEffect(() => {
    if (search && city) {
      getBusRoute({ cityName: city, keyword: search })
      sessionStorage.setItem('search', search)
      sessionStorage.setItem('city', city)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, city])
  useEffect(() => {
    handleFilterLowFloor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterLowFloor])
  useEffect(() => {
    const search = sessionStorage.getItem('search')
    const city = sessionStorage.getItem('city')
    if (search && city) {
      setKeyword(search)
      setSelectCity({
        city,
        cityName: cityCode?.find((c) => c.City === city)?.CityName || '',
      })
      router.replace(`/${locale}/searchBus?search=${search}&city=${city}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='px-[16px]'>
      <select
        className='mb-[12px] mt-[56px] bg-[transparent] text-2xl'
        onChange={handleSelectCityChange}
        value={selectCity.city}
      >
        <option key='NONE' value=''>
          {t('choose-counties-or-cities')}
        </option>
        {cityCode?.map((city) => (
          <option key={city.CityCode} value={city.City}>
            {city[locale === 'zh-TW' ? 'CityName' : 'City']}
          </option>
        ))}
      </select>
      <div className='relative'>
        <input
          type='text'
          className='h-[56px] w-full rounded px-[13px] pl-[16px] shadow-md focus:outline-primary-default'
          value={keyword}
          onChange={handleInputChange}
          placeholder={t('enter-bus-route-or-stop-name')}
          onKeyDown={handleKeyDown}
        />
        {keyword === '' ? (
          <div className='absolute right-[18px] top-[50%] flex h-[24px] w-[24px] items-center justify-center translate-y-[-50%]'>
            <Image
              className='h-[auto] w-[auto]'
              alt='search'
              src='/search-icon.svg'
              width={0}
              height={0}
            />
          </div>
        ) : (
          <Image
            alt='close'
            className='absolute right-[18px] top-[50%] h-[auto] w-[auto] cursor-pointer translate-y-[-50%]'
            src='/close-style2.svg'
            onClick={handleCleanInput}
            width={0}
            height={0}
          />
        )}
      </div>
      <div className='px-[4px] py-[8px] leading-7'>
        <Checkbox checked={checked} onChange={handleCheckStatus}>
          {t('only-show-routes-that-has-low-floor')}
        </Checkbox>
      </div>
      <div>
        <p className='text-sm text-gray-600'>
          {busRoute && busRoute.length > 0
            ? t('search-results')
            : t('search-history')}
        </p>
        <SearchList
          data={busRoute}
          type='result'
          city={selectCity.cityName}
          locale={locale}
        />
      </div>
    </div>
  )
}
