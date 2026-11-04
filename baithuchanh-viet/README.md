# ShopMini

Ứng dụng cửa hàng mini bằng React + TypeScript (Vite), dùng Context API và Redux Toolkit.

## Chạy dự án

```bash
npm install
npm run dev
```

Đăng nhập: username bất kỳ, password `123456`.

## Dữ liệu nằm ở đâu và vì sao

| Dữ liệu | Nơi lưu | Lý do |
|---|---|---|
| Từ khoá tìm kiếm (HomePage) | `useState` | Chỉ dùng trong một trang, không cần chia sẻ. |
| Input form đăng nhập, thông báo lỗi | `useState` | State tạm của form, chỉ component đó dùng. |
| Cờ `ordered` ở trang Thanh toán | `useState` | Chỉ để hiện thông báo thành công, không cần toàn cục. |
| Theme sáng/tối | Context (`ThemeContext`) | Dùng ở nhiều nơi (Header, `<html>`), ít thay đổi, logic đơn giản. |
| Người dùng đăng nhập (`user`, `login`, `logout`) | Context (`AuthContext`) | Cần ở Header, ProtectedRoute, LoginPage; ít cập nhật, không cần middleware. |
| Danh sách sản phẩm + loading/succeeded/failed | Redux (`productsSlice`) | Dữ liệu bất đồng bộ từ API, dùng `createAsyncThunk`; nhiều trang dùng chung nên chỉ fetch một lần. |
| Giỏ hàng + tổng số lượng/tổng tiền | Redux (`cartSlice`) | Nhiều component đọc/ghi (Card, Header, Cart, Checkout), có logic phức tạp, tổng tính bằng selector. |
