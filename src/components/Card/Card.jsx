import React from 'react'
import styled from 'styled-components'
import { ContextPeople } from '../../context/Context'


const CardBox = styled.div`
    border: none;
    border-radius: 8px;

    width: 330px;
    height: auto;
    padding: 22px;
    background: rgba(255, 255, 255, 0.25); /* Semi-transparente */
    backdrop-filter: blur(10px); /* Efeito de desfoque */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
    color: var(--white);
`

const CardImage = styled.img`
    width: 100%;
    border-radius: 6px;
`


function Card({person, filter}) {
  const URL_IMAGE = 'https://starwars-databank-server.vercel.app/api/v1/characters/name/'

  const context = React.useContext(ContextPeople)

  const [planetInfos, setPlanetInfos] = React.useState({})
  const [starshipInfos, setStarshipInfos] = React.useState([])
  const [image, setImage] = React.useState({})

    async function getPlanetInfos(url){
        try{
            const response = await fetch(url)
            if(response.ok && response.status === 200){
                const data = await response.json()
                setPlanetInfos(data)
                if(!filter && !context.block) context.setPlanetArray(prevArray => [...prevArray, data])
            }
        }

        catch(error){   
            console.error('erros: ', error)
        }
    }

    async function getPersonStarship(url){
        try{
            const response = await fetch(url)
            if(response.ok && response.status === 200){
                const data = await response.json()
                setStarshipInfos(prevArray => [...prevArray, data])
                if(!filter && !context.block) context.setStarshipArray(prevArray => [...prevArray, data])
            }
        }

        catch(error){   
            console.error('erros: ', error)
        }
    }

    async function getPersonImage(name){
        try{
            const response = await fetch(`${URL_IMAGE}${name}`)
            if(response.ok && response.status === 200){
                const data = await response.json()
                setImage(data[0].image)
            }
        }

        catch(error){   
            console.error('erros: ', error)
        }
    }

  React.useEffect(() => {
    if(person.homeworld) getPlanetInfos(person.homeworld)

    if(person.name) getPersonImage(person.name)

    if(person.starships && person.starships.length > 0) {
        person.starships.forEach((starship) => {
            getPersonStarship(starship)
        })        
    }
  }, [])

  return (
    <CardBox>
        {image && <CardImage src={image} alt="" />}
        <p>Nome {person.name}</p>
        <p>Altura(m) {person.height}</p>
        <p>Peso(Kg) {person.mass}</p>
        <p>Gênero {person.gender}</p>
        <p>Ano de Nascimento {person.birth_year}</p>
        <p>Quantidade de filmes {person.films.length}</p>
        {planetInfos && <p>Planeta {planetInfos.name}</p>}
        {planetInfos && <p>Terreno {planetInfos.terrain}</p>}
        {planetInfos && <p>Clima {planetInfos.climate}</p>}
        {planetInfos && <p>População {planetInfos.population}</p>}
        {starshipInfos && starshipInfos.map((starship) => (
            <p>Nave {starship.name}</p>
        ))}
    </CardBox>
  )
}

export default Card