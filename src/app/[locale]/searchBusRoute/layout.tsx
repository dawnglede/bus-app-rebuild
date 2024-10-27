import SideMenu from '@/components/SideMenu'
import { type Locale } from '../../../../i18n-config'

interface RootLayoutProps {
  children?: React.ReactNode
  params: { locale: Locale }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <div>
      <SideMenu locale={params.locale} />
      {children}
    </div>
  )
}
