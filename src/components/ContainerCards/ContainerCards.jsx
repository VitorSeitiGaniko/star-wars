import React from 'react'
import Card from '../Card/Card'
import styled from 'styled-components'
import { ContextPeople } from '../../context/Context'

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
`

function ContainerCards() {
    const context = React.useContext(ContextPeople)

    const [loading, setLoading] = React.useState(true)    
    const [nextPage, setNextPage] = React.useState('')
    const [prevPage, setPrevPage] = React.useState('')

    async function getPeople(url){
        try{
            const response = await fetch(url)
            if(response.ok && response.status === 200){
                const data = await response.json()
                console.log(data);
                
                context.setPlanetArray([])
                context.setStarshipArray([])
                context.setPeopleArray(data.results)
                context.setRemove(true)
                if(data.previous) setPrevPage(data.previous)
                if(data.next) setNextPage(data.next)
            }
        }
    
        catch(error){   
            console.error('erros: ', error)
        }
    }    

    React.useEffect(() => {
        getPeople('https://swapi.dev/api/people')
    }, [])
    
    React.useEffect(() => {
        if(context.peopleArray && context.peopleArray.length > 0) setLoading(false)
    }, [context.peopleArray])
    
    
  return (
    <>
        <CardContainer>
            {!loading && !context.isSearchList && context.peopleArray.map((person, index) => (
                <Card key={person.name+index} person={person}/>
            ))}

            {!loading && context.isSearchList && context.peopleFilteredArray.map((person, index) => (
                <Card key={person.name+index} person={person} filter={true}/>
            ))}
        </CardContainer>
        {!context.isSearchList && prevPage && <button onClick={() => getPeople(prevPage)}>Página Anterior</button>}
        {!context.isSearchList && nextPage && <button onClick={() => getPeople(nextPage)}>Próxima página</button>}
    </>    
  )
}

export default ContainerCards