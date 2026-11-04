import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  updateQuantity,
} from '../features/cart/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectTotalPrice)

  if (items.length === 0) return <p>Giỏ hàng trống. <Link to="/">Mua sắm ngay</Link></p>

  return (
    <>
      <h1>Giỏ hàng</h1>
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="cart-row">
          <img src={product.image} alt={product.title} />
          <span className="grow">{product.title}</span>
          <span>${product.price.toFixed(2)}</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              dispatch(updateQuantity({ id: product.id, quantity: Number(e.target.value) }))
            }
          />
          <button className="icon-text" onClick={() => dispatch(removeFromCart(product.id))}>
            <Trash2 size={14} /> Xoá
          </button>
        </div>
      ))}
      <h2>Tổng: ${total.toFixed(2)}</h2>
      <button onClick={() => dispatch(clearCart())}>Xoá giỏ hàng</button>{' '}
      <Link to="/checkout"><button>Thanh toán</button></Link>
    </>
  )
}
