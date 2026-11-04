import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, Search } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

type Sort = 'default' | 'price-asc' | 'price-desc' | 'name'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<Sort>('default')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  )

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    const list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) && p.title.toLowerCase().includes(kw),
    )
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'name') list.sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [products, keyword, category, sort])

  return (
    <>
      <section className="hero">
        <h1>Shop</h1>
        <span className="hero-line" />
        <p className="icon-text crumb">Home <ChevronRight size={12} /> Shop All Products</p>
      </section>

      <div className="tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? 'tab active' : 'tab'}
            onClick={() => setCategory(c)}
          >
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <span className="muted">
          Showing {filtered.length} of {products.length} products
        </span>
        <label className="search-box">
          <Search size={16} />
          <input
            placeholder="Tìm sản phẩm theo tên..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="default">Sort by newness</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="name">Tên A-Z</option>
        </select>
      </div>

      <div className="container">
        {status === 'loading' && <p>Đang tải...</p>}
        {status === 'failed' && (
          <p className="error">
            {error} <button onClick={() => dispatch(fetchProducts())}>Thử lại</button>
          </p>
        )}
        {status === 'succeeded' && filtered.length === 0 && (
          <EmptyState title="Không tìm thấy sản phẩm nào">
            <p className="muted">Thử từ khoá khác hoặc chọn danh mục khác nhé.</p>
          </EmptyState>
        )}
        <div className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  )
}
