import { Route, Routes } from "react-router-dom"
import SignLayout from "./app/auth/layout"
import HomePage from "./app/home/page"
import { useAuth } from "./hooks/useAuth"
import SignInPage from "./app/auth/sign-in/page";
import SignUpPage from "./app/auth/sign-up/page";


function App() {
  
  const { user } = useAuth();

  return (
    <div id="App">
      <Routes>
        { (!user ? (
          <Route path="auth" element={ <SignLayout /> }>
            <Route path="sign-in" element={ <SignInPage />} />
            <Route path="sign-up" element={ <SignUpPage />} />
          </Route>
        ) : (
          <Route path="/" element={ <HomePage /> } />
        )) }
      </Routes>      
    </div>
  )
}

export default App