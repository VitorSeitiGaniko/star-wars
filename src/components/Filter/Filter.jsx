import React from 'react'
import { ContextPeople } from '../../context/Context'

function Filter() {
    const URL_PLANETS = 'https://swapi.dev/api/planets'

    const context = React.useContext(ContextPeople)

    const [selectedPlanet, setSelectedPlanet] = React.useState('')
    const [filterStarship, setFilterStarship] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    function removeDuplicates() {
        console.log('context.planetArray: ', context.planetArray);
        
        const uniquePlanets = [];
        const names = new Set();

        const uniquePlanets02 = [];
        const names02 = new Set();
    
        context.planetArray.forEach(planet => {
            if (!names.has(planet.name)) {
                names.add(planet.name);
                uniquePlanets.push(planet);
            }
        });

        context.starshipArray.forEach(planet => {
            if (!names02.has(planet.name)) {
                names02.add(planet.name);
                uniquePlanets02.push(planet);
            }
        });

        console.log('context.planetArray: 02 ', uniquePlanets);
    
        context.setPlanetArray(uniquePlanets);
        context.setStarshipArray(uniquePlanets02);
        setLoading(true)
        context.setRemove(false)
    }


    function applyCombinedFilter(event) {
        event.preventDefault()
        //context.setBlock(true)
        context.setUsSearchList(true);
        const arrayFiltered = context.peopleArray.filter((person) => {
            const matchesPlanet = selectedPlanet ? person.homeworld === selectedPlanet : true ;
            const matchesStarship = filterStarship ? person.starships && person.starships.length > 0 && person.starships.some((starship) => starship === filterStarship) : true;
            return matchesPlanet && matchesStarship;
        });
        console.log('arrayFiltered: ', arrayFiltered);
        
        context.setPeopleFilteredArray(arrayFiltered);
    }

    React.useEffect(() => {
        if(context.planetArray.length > 0 && 
           context.planetArray.length === context.peopleArray.length
           && context.remove
        ) {
            removeDuplicates()
        }
    }, [context.planetArray])

  return (
    <div>
        <form>
            <label>Planeta</label>
            <select value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
                <option defaultValue="Selecione um planeta">
                    Selecione um planeta
                </option>
                {loading && context.planetArray && context.planetArray.length > 0 && context.planetArray.map((planet) => (
                    <option key={planet.name} value={planet.url}>{planet.name}</option>
                ))}
            </select>

            <label>Nave espacial</label>
            <select value={filterStarship} onChange={(e) => setFilterStarship(e.target.value)}>
                <option defaultValue="Selecione uma nave">
                    Selecione uma nave
                </option>
                {loading && context.starshipArray && context.starshipArray.length > 0 && context.starshipArray.map((planet) => (
                    <option key={planet.name} value={planet.url}>{planet.name}</option>
                ))}
                
            </select>
            <button onClick={applyCombinedFilter}>Pesquisar</button>
        </form>
        <button onClick={() => {
            context.setUsSearchList(false)
            context.setBlock(true)
        }}>LIMPAR</button>
    </div>
  )
}

export default Filter