import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'

export default function MainLayout() {
  const { pathname } = useLocation()
  // Trang chủ tự quản lý bố cục full-width (banner, tab danh mục)
  const isHome = pathname === '/'
  return (
    <>
      <Header />
      {isHome ? (
        <Outlet />
      ) : (
        <main className="container">
          <Outlet />
        </main>
      )}
    </>
  )
}
