import { Link, NavLink } from 'react-router-dom'
import { LogIn, LogOut, Moon, ShoppingCart, Sun, User } from 'lucide-react'
import { useAppSelector } from '../app/hooks'
import { selectTotalQuantity } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const totalQty = useAppSelector(selectTotalQuantity)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header>
      <div className="promo">
        <u>FREE SHIPPING AND RETURNS</u> ON ALL ORDERS ABOVE $200
      </div>
      <div className="topbar">
        <div className="topbar-side">
          {user ? (
            <>
              <span className="icon-text"><User size={16} /> <b>{user.username}</b></span>
              <button className="link-btn icon-text" onClick={logout}>
                <LogOut size={16} /> Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="icon-text"><LogIn size={16} /> Đăng nhập</Link>
          )}
          <button className="link-btn icon-text" onClick={toggleTheme}>
            {theme === 'light' ? <><Moon size={16} /> Tối</> : <><Sun size={16} /> Sáng</>}
          </button>
        </div>
        <Link to="/" className="logo">shopmini.</Link>
        <div className="topbar-side right">
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={20} /> <span className="badge">{totalQty}</span>
          </Link>
        </div>
      </div>
      <nav className="menu">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/cart">Giỏ hàng</NavLink>
        <NavLink to="/checkout">Thanh toán</NavLink>
      </nav>
    </header>
  )
}
