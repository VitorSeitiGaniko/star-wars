import React from 'react'
import { ContextPeople } from '../../context/Context'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
`  	

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 32px;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        gap: 16px;
    }

    @media (min-width: 768px) and (max-width: 1170px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
`

const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Label = styled.label`
    font-size: 16px;
    font-weight: 700;
    text-align: center;
`

const Select = styled.select`
    border: none;
    border-radius: 8px;
    padding: 4px 28px;
    margin-top: 4px;
`

const Button = styled.button`
    border: none;
    border-radius: 20px;
    padding: 0 80px;
    font-size: 16px;
    font-weight: 700;
    height: 42px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 30%;
        margin: auto;
        padding: 0;
    }

    @media (min-width: 768px) and (max-width: 1170px) {
        margin-top: 16px;
    }
`

const ButtonClear = styled(Button)`
    display: flex;
    margin: auto;
    margin-top: 32px;
    padding: 12px 50px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 129px;
        height: auto;
        padding: 11px;
    }
`


function Filter() {
    const context = React.useContext(ContextPeople)

    const [selectedPlanet, setSelectedPlanet] = React.useState('')
    const [selectedStarship, setSelectedStarship] = React.useState('')
    const [selectedSpecie, setSelectedSpecie] = React.useState('')

    function removeDuplicates() {
        context.setLoading(true)
        context.setLazyLoading(true)
        const uniquePlanets = []
        const namePlanets = new Set()

        const uniqueStarships = []
        const nameStarships = new Set()

        const uniqueSpecies = []
        const nameSpecies = new Set()

        context.planetArray.forEach(planet => {
            if (!namePlanets.has(planet.name)) {
                namePlanets.add(planet.name)
                uniquePlanets.push(planet)
            }
        })

        context.starshipArray.forEach(starship => {
            if (!nameStarships.has(starship.name)) {
                nameStarships.add(starship.name)
                uniqueStarships.push(starship)
            }
        })

        context.specieArray.forEach(specie => {
            if (!nameSpecies.has(specie.name)) {
                nameSpecies.add(specie.name)
                uniqueSpecies.push(specie)
            }
        })

        context.setPlanetArray(uniquePlanets);
        context.setStarshipArray(uniqueStarships);
        context.setSpecieArray(uniqueSpecies);
        context.setLoading(false)
        context.setLazyLoading(false)
        context.setAllowPush(false)
    }

    function applyCombinedFilter(event) {
        event.preventDefault()
        context.setIsFilterList(true);

        const arrayFiltered = context.peopleArray.filter((person) => {
            const matchesPlanet = selectedPlanet ? person.homeworld === selectedPlanet : true ;
            const matchesStarship = selectedStarship ? person.starships && person.starships.length > 0 && person.starships.some((starship) => starship === selectedStarship) : true;
            const matchesSpecie = selectedSpecie ? person.species && person.species.length > 0 && person.species.some((specie) => specie === selectedSpecie) : true;
            return matchesPlanet && matchesStarship && matchesSpecie;
        });

        context.setPeopleFilteredArray(arrayFiltered);
    }

    function cleanFilter() {
        context.setIsFilterList(false)
        setSelectedPlanet('')
        setSelectedStarship('')
        setSelectedSpecie('')
        context.setRemove(false)
    }

    function hasNoDuplicates(array) {
        const seen = new Set();
        for (const item of array) {
            if (seen.has(item)) {
                return false; // Encontrou um item duplicado
            }
            seen.add(item);
        }
        return true; // Não encontrou itens duplicados
    }

    React.useEffect(() => {        
        if(
           context.planetArray.length > 0 
           && context.planetArray.length === context.peopleArray.length
           && context.remove
        ) {
            removeDuplicates()
        }
    }, [context.planetArray, context.isFilterList])

    React.useEffect(() => {
        if(
            context.planetArray.length === context.peopleArrayLength &&
            (
                hasNoDuplicates(context.planetArray)
                ||  hasNoDuplicates(context.starshipArray)
                ||  hasNoDuplicates(context.specieArray)
            )            
        ) {
            context.setLazyLoading(true)
            removeDuplicates()
        } else{
            context.setLazyLoading(false)
        }
    }, [context.topic_Search])

  return (
    <>
        {!context.loading && (
        <Container>
            <Form>
                <SelectContainer>
                    <Label>Planeta</Label>
                    <Select value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
                        <option defaultValue="Selecione um planeta">
                            Selecione um planeta
                        </option>
                        {context.planetArray && context.planetArray.length > 0 && context.planetArray.map((planet, index) => (
                        <option key={planet.name + index} value={planet.url}>{planet.name}</option>
                        ))}
                    </Select>
                </SelectContainer>
                
                <SelectContainer>
                    <Label>Nave espacial</Label>
                    <Select value={selectedStarship} onChange={(e) => setSelectedStarship(e.target.value)}>
                        <option defaultValue="Selecione uma nave">
                            Selecione uma nave
                        </option>
                        {context.starshipArray && context.starshipArray.length > 0 && context.starshipArray.map((planet, index) => (
                        <option key={planet.name + index} value={planet.url}>{planet.name}</option>
                        ))}
                    </Select>
                </SelectContainer>

                <SelectContainer>
                    <Label>Espécie</Label>
                    <Select value={selectedSpecie} onChange={(e) => setSelectedSpecie(e.target.value)}>
                        <option defaultValue="Selecione uma espécie">
                            Selecione uma espécie
                        </option>
                        {context.specieArray && context.specieArray.length > 0 && context.specieArray.map((specie, index) => (
                        <option key={specie.name + index} value={specie.url}>{specie.name}</option>
                        ))}
                    </Select>
                    </SelectContainer>
                <Button onClick={applyCombinedFilter}>Filtrar</Button>
            </Form>
            <ButtonClear onClick={cleanFilter}>Limpar Filtros</ButtonClear>
        </Container>
        )}
    </>
  )
}

export default Filter