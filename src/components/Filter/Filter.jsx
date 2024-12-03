import React from 'react'
import { ContextPeople } from '../../context/Context'

function Filter() {
    const context = React.useContext(ContextPeople)

    const [selectedPlanet, setSelectedPlanet] = React.useState('')
    const [selectedStarship, setSelectedStarship] = React.useState('')
    const [selectedSpecie, setSelectedSpecie] = React.useState('')

    function removeDuplicates() {
        console.log('REMOVENDO');
        
        context.setLoading(true)
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

    React.useEffect(() => {
        console.log('context.planetArray.length ==> ', context.planetArray.length);
        console.log('context.peopleArray.length ==> ', context.peopleArray.length);
        console.log('context.remove ==> ', context.remove);
        
        if(
           context.planetArray.length > 0 
           && context.planetArray.length === context.peopleArray.length
           && context.remove
        ) {
            removeDuplicates()
        }
    }, [context.planetArray, context.isFilterList])

  return (
    <>
        {!context.loading && (
        <div>
            <form>
                <label>Planeta</label>
                <select value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
                    <option defaultValue="Selecione um planeta">
                        Selecione um planeta
                    </option>
                    {context.planetArray && context.planetArray.length > 0 && context.planetArray.map((planet, index) => (
                    <option key={planet.name + index} value={planet.url}>{planet.name}</option>
                    ))}
                </select>

                <label>Nave espacial</label>
                <select value={selectedStarship} onChange={(e) => setSelectedStarship(e.target.value)}>
                    <option defaultValue="Selecione uma nave">
                        Selecione uma nave
                    </option>
                    {context.starshipArray && context.starshipArray.length > 0 && context.starshipArray.map((planet, index) => (
                    <option key={planet.name + index} value={planet.url}>{planet.name}</option>
                    ))}
                </select>

                <label>Espécie</label>
                <select value={selectedSpecie} onChange={(e) => setSelectedSpecie(e.target.value)}>
                    <option defaultValue="Selecione uma espécie">
                        Selecione uma espécie
                    </option>
                    {context.specieArray && context.specieArray.length > 0 && context.specieArray.map((specie, index) => (
                    <option key={specie.name + index} value={specie.url}>{specie.name}</option>
                    ))}
                </select>
                <button onClick={applyCombinedFilter}>Pesquisar</button>
            </form>
            <button onClick={cleanFilter}>LIMPAR</button>
        </div>
        )}
    </>
  )
}

export default Filter