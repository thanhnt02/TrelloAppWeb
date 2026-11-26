import { Navigate, Route, Routes } from 'react-router-dom'

import Auth from '~/pages/Auth/Auth'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'

function App() {
  return (
    <Routes>
      {/* Redirect route */}
      <Route
        path="/"
        element={
          // ở đây cần replace là true để nó thay thế route /, có thể hiểu route / sẽ không còn nằm trong history của Browser nữa
          // Thực hành thử bằng cách nhấn Go home từ trang 404 xong thử quay lại bằng nút back của trình duyệt vào trường hợp có replace hoặc không có
          <Navigate to="/boards/6af71570a6a0dd81c25d0966" replace={true} />
        }
      />
      {/* Board Details */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* 404 not found page*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
