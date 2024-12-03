import { createRoot } from 'react-dom/client'
import './index.css'
import ContainerCards from './components/ContainerCards/ContainerCards.jsx'
import { ContextProvider } from './context/Context.jsx'
import styled from 'styled-components'
import Search from './components/Search/Search.jsx'
import Filter from './components/Filter/Filter.jsx'
import ModalCard from './components/ModalCard/ModalCard.jsx'
import Loading from './components/Loading/Loading.jsx'

const ContainerApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1170px;

  @media (max-width: 768px) {
    width: 100vw;
  }

  @media (min-width: 768px) and (max-width: 1170px) {
    width: 90vw;
  }
`

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <ContainerApp>
      <Search />
      <Filter />
      <ContainerCards />
      <ModalCard />
      <Loading />
    </ContainerApp>
  </ContextProvider>
  
)
