import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartItems, selectTotalPrice } from '../features/cart/cartSlice'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectTotalPrice)
  const [ordered, setOrdered] = useState(false)

  if (ordered) {
    return (
      <div>
        <p className="success icon-text">
          <CheckCircle2 size={24} /> Đặt hàng thành công! Cảm ơn bạn.
        </p>
        <Link to="/">Tiếp tục mua sắm</Link>
      </div>
    )
  }

  if (items.length === 0) return <p>Giỏ hàng trống. <Link to="/">Mua sắm ngay</Link></p>

  const handleOrder = () => {
    dispatch(clearCart())
    setOrdered(true)
  }

  return (
    <>
      <h1>Thanh toán</h1>
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            {product.title} × {quantity} — ${(product.price * quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Tổng: ${total.toFixed(2)}</h2>
      <button onClick={handleOrder}>Đặt hàng</button>
    </>
  )
}
