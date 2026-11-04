import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
} from '../features/products/productsSlice'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  if (status === 'idle' || status === 'loading') return <p>Đang tải...</p>

  const product = products.find((p) => p.id === Number(id))
  if (!product) return <p>Không tìm thấy sản phẩm. <Link to="/">Về trang chủ</Link></p>

  return (
    <div className="detail">
      <img src={product.image} alt={product.title} />
      <div>
        <h1>{product.title}</h1>
        <p className="muted">{product.category}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button onClick={() => dispatch(addToCart(product))}>Thêm vào giỏ</button>
      </div>
    </div>
  )
}
