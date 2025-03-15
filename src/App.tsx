import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/Layouts/MainLayout"
import { TodoPage } from "./components/pages/TodoPage"
import { ProfilePage } from "./components/pages/ProfilePage"
import { AuthLayout } from "./components/Layouts/AuthLayout"
import { LoginPage } from "./components/pages/LoginPage"
import { RegisterPage } from "./components/pages/RegisterPage"
import { ProtectedRoutes } from "./ProtectedRoutes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes auth={true} />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TodoPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="registration" element={<RegisterPage />}/>
          </Route>
        </Route>
        <Route path='*' element={<h2>Нет такой страницы!</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App