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
    const URL_PERSON = 'https://swapi.dev/api/people'
    const context = React.useContext(ContextPeople)

    async function getPeople(url){
        context.setLoading(true)
        
        context.setNextPage('')
        context.setPrevPage('')

        try{
            const response = await fetch(url)
            if(response.ok && response.status === 200){
                const data = await response.json()
                console.log('DATA LIST  ==> ', data);

                context.setPlanetArray([])
                context.setStarshipArray([])
                context.setSpecieArray([])
                context.setPeopleArray(data.results)
                context.setRemove(true)

                if(data.previous) context.setPrevPage(data.previous)
                if(data.next) context.setNextPage(data.next)
            }
        }
    
        catch(error){   
            console.error('erros: ', error)
        }
    }

    function handlePrevPage(){
        getPeople(context.prevPage)
        context.setPlanetArray([])
        context.setStarshipArray([])
        context.setSpecieArray([])
        context.setAllowPush(true)
    }

    function handleNextPage(){
        getPeople(context.nextPage)
        context.setPlanetArray([])
        context.setStarshipArray([])
        context.setSpecieArray([])
        context.setAllowPush(true)
    }

    React.useEffect(() => {
        getPeople(URL_PERSON)
    }, [])

  return (
    <>        
        <CardContainer>
            {!context.isFilterList && context.peopleArray.map((person, index) => (
            <Card key={person.name + index} person={person} />
            ))}

            {context.isFilterList && context.peopleFilteredArray.map((person, index) => (
            <Card key={person.name + index} person={person} filter={true} />
            ))}
        </CardContainer>
        
        {!context.loading && !context.isFilterList && context.prevPage && <button onClick={handlePrevPage}>Página Anterior</button>}

        {!context.loading && !context.isFilterList && context.nextPage && <button onClick={handleNextPage}>Próxima página</button>}
    </>    
  )
}

export default ContainerCards