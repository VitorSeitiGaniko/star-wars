import { createRoot } from 'react-dom/client'
import './index.css'
import ContainerCards from './components/ContainerCards/ContainerCards.jsx'
import { ContextProvider } from './context/Context.jsx'
import styled from 'styled-components'
import Search from './components/Search/Search.jsx'
import Filter from './components/Filter/Filter.jsx'

const ContainerApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <ContainerApp>
      <Search />
      <Filter />
      <ContainerCards />
    </ContainerApp>
  </ContextProvider>
  
)
