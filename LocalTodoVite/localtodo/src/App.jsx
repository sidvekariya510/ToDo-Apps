import TodoMain from "./components/TodoMain"
import { MainProvider } from "./context/MainContext"
import CartComponent from "./components/ShoppingCart"

function App() {
  return (
    <MainProvider>
      <div style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
        <TodoMain />
        {/* <CartComponent /> */}
      </div>
    </MainProvider>
  )
}

export default App
