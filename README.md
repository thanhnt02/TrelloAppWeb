# Trello Board

Ứng dụng quản lý công việc theo mô hình Kanban, xây dựng với React và Redux Toolkit. Công việc được tổ chức thành các cột và thẻ; người dùng có thể kéo thả để sắp xếp thứ tự và chuyển công việc giữa các cột.

Đây là dự án cá nhân tập trung vào trải nghiệm tương tác trên board, quản lý trạng thái tập trung và đồng bộ dữ liệu với REST API.

## Tính năng

- Tải và hiển thị board cùng danh sách cột, thẻ từ backend.
- Tạo cột mới và thêm thẻ công việc vào từng cột.
- Kéo thả để sắp xếp cột, đổi thứ tự thẻ trong cùng cột hoặc chuyển thẻ sang cột khác.
- Hỗ trợ kéo thả vào cột rỗng và gửi thứ tự mới lên backend.
- Xóa cột với hộp thoại xác nhận.
- Hiển thị ảnh bìa và số lượng thành viên, bình luận, tệp đính kèm khi dữ liệu thẻ có sẵn.
- Chuyển giao diện sáng, tối hoặc theo thiết lập hệ thống.
- Hiển thị trạng thái tải board và thông báo cho một số thao tác.

## Công nghệ

| Công nghệ | Vai trò |
| --- | --- |
| React 18, JavaScript | Xây dựng giao diện và các thành phần tương tác |
| Redux Toolkit, React Redux | Quản lý board đang mở; tải dữ liệu bất đồng bộ bằng `createAsyncThunk` |
| Material UI, Emotion | Thành phần giao diện, bố cục và theme sáng/tối |
| dnd-kit | Kéo thả cột và thẻ với chuột hoặc thao tác chạm |
| Axios | Giao tiếp với REST API |
| Vite, React SWC | Chạy môi trường phát triển và build ứng dụng |
| ESLint | Kiểm tra quy tắc mã nguồn |
| React Toastify, Material UI Confirm | Thông báo và hộp thoại xác nhận |

## Chạy trên máy

### 1. Chuẩn bị

- Node.js đáp ứng `engines` trong [`package.json`](package.json): `>=18.x`.
- Yarn Classic `1.x`.
- Backend tương thích với API `/v1` của dự án, có sẵn một board để tải dữ liệu.

Repository này chứa frontend. Backend và cơ sở dữ liệu cần được khởi động, cấu hình riêng.

### 2. Cài thư viện

Mở terminal tại thư mục chứa `package.json` và chạy:

```bash
yarn install
```

Dự án có `yarn.lock` để lưu các phiên bản dependency đã được giải quyết.

### 3. Cấu hình API và board

Trong chế độ phát triển, frontend gọi backend tại:

```text
http://localhost:8017
```

Địa chỉ này được khai báo trong [`src/utils/constants.js`](src/utils/constants.js). Nếu backend chạy ở địa chỉ khác, cập nhật `apiRoot` trong nhánh `BUILD_MODE === 'dev'`.

Tiếp theo, mở [`src/pages/Boards/_id.jsx`](src/pages/Boards/_id.jsx) và thay giá trị `boardId` bằng `_id` của một board tồn tại trong backend. Phiên bản hiện tại mở trực tiếp board này.

Backend cũng cần cho phép origin của frontend trong cấu hình CORS.

### 4. Khởi động frontend

```bash
yarn dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định là `http://localhost:5173`. Backend cần tiếp tục chạy trong quá trình sử dụng ứng dụng.

## Các lệnh

| Lệnh | Tác dụng |
| --- | --- |
| `yarn dev` | Chạy Vite ở chế độ phát triển, đặt `BUILD_MODE=dev` |
| `yarn lint` | Kiểm tra ESLint; script không chấp nhận warning |
| `yarn build` | Build ứng dụng với `BUILD_MODE=production` vào thư mục `dist/` |
| `yarn preview` | Xem thử bản build trên máy |

Trước khi build để triển khai, cập nhật `apiRoot` trong nhánh `BUILD_MODE === 'production'` tại [`src/utils/constants.js`](src/utils/constants.js) bằng URL backend của bạn. Giá trị đang có là địa chỉ mẫu cũ.

```bash
yarn build
yarn preview
```

`yarn preview` phục vụ bản build đã tạo, không khởi động backend.

## Tổ chức mã nguồn

```text
src/
├── apis/                  # Các request tạo, cập nhật, xóa dữ liệu
├── assets/                # Hình ảnh và biểu tượng
├── components/            # Thành phần dùng chung: AppBar, ModeSelect
├── customLibraries/       # Tùy chỉnh sensor cho thao tác kéo thả
├── pages/Boards/          # Giao diện board, danh sách cột và thẻ
├── redux/
│   ├── activeBoard/       # Slice, thunk và selector của board đang mở
│   └── store.js           # Cấu hình Redux store
├── utils/                 # API root, sắp xếp và xử lý dữ liệu
├── App.jsx                # Điểm vào giao diện board
├── main.jsx               # Khởi tạo React và các provider
└── theme.js               # Theme Material UI
```

Dữ liệu board được tải qua thunk trong [`activeBoardSlice.js`](src/redux/activeBoard/activeBoardSlice.js), sắp xếp theo `columnOrderIds` và `cardOrderIds`, rồi lưu vào Redux. Các thao tác tạo, xóa và kéo thả cập nhật giao diện kết hợp với các request ghi dữ liệu lên backend.

## Phạm vi hiện tại

Phiên bản này tập trung vào màn hình chi tiết board. Danh sách board, đăng nhập/đăng ký và định tuyến giữa các trang chưa được triển khai.

Một số mục như tìm kiếm, bộ lọc, lời mời thành viên và menu tài khoản mới có phần giao diện. Các số liệu bình luận, tệp đính kèm và thành viên trên thẻ đang dùng để hiển thị dữ liệu; chưa có luồng chỉnh sửa tương ứng.

Ứng dụng hiện cần backend thật để tải và lưu board; file `mock-data.js` không được dùng trong luồng chạy chính.

## Kiểm tra khi chưa tải được board

- Xác nhận backend đã khởi động và địa chỉ API khớp với `apiRoot`.
- Kiểm tra `boardId` có tồn tại trong cơ sở dữ liệu.
- Mở tab **Network** trong DevTools để xem request `/v1/boards/:boardId` và phản hồi từ backend.
- Kiểm tra cấu hình CORS nếu trình duyệt chặn request.

---

Nguồn tham khảo ban đầu: [MERN Stack Trello — TrungQuanDev](https://www.youtube.com/playlist?list=PLP6tw4Zpj-RJP2-YrhtkWqObMQ-AA4TDy).
