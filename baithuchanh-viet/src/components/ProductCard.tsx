import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  return (
    <div className="card">
      <Link to={`/products/${product.id}`} className="card-img">
        <img src={product.image} alt={product.title} />
      </Link>
      <Link to={`/products/${product.id}`} className="card-title line-clamp">
        {product.title}
      </Link>
      <p className="price">${product.price.toFixed(2)}</p>
      <button className="icon-text" onClick={() => dispatch(addToCart(product))}>
        <ShoppingBag size={14} /> Thêm vào giỏ
      </button>
    </div>
  )
}
