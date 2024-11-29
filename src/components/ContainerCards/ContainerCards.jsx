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

    async function getPeople(){
        try{
            const response = await fetch('https://swapi.dev/api/people')
            if(response.ok && response.status === 200){
                const data = await response.json()
                console.log(data);
                
                context.setPeopleArray(data.results)
            }
        }
    
        catch(error){   
            console.error('erros: ', error)
        }
    }    

    React.useEffect(() => {
        getPeople()
    }, [])
    
    React.useEffect(() => {
        if(context.peopleArray && context.peopleArray.length > 0) setLoading(false)
    }, [context.peopleArray])
    
    
  return (
    <CardContainer>
        {!loading && context.peopleArray.map((person, index) => (
            <Card key={person.name+index} person={person}/>
        ))}
    </CardContainer>
  )
}

export default ContainerCards