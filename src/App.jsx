import { Outlet } from 'react-router-dom'
import { useLocal } from './hooks/useLocal'

function App() {
const [points, setPoints] = useLocal('points',0) 
  return (
    <Outlet context={[points,setPoints]}/>
  )
}

export default App
