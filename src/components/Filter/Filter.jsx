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
    
        context.planetArray.forEach(planet => {
            if (!names.has(planet.name)) {
                names.add(planet.name);
                uniquePlanets.push(planet);
            }
        });
    
        context.setPlanetArray(uniquePlanets);
        setLoading(true)
    }

    function handleSelected(event){
        event.preventDefault()

        setSelectedPlanet(event.target.value)
        applyFilter()
    }

    function applyFilter(){
        const arrayFiltered = context.peopleArray.filter((person) => {
            return person.homeworld === selectedPlanet
        })
        console.log('arrayFiltered: ', arrayFiltered);
        
        //context.setPeopleArray(arrayFiltered)
    }

    React.useEffect(() => {
        if(context.planetArray.length > 0 && context.planetArray.length === context.peopleArray.length && !loading) removeDuplicates()
    }, [context.planetArray])

  return (
    <div>
        <form onSubmit={handleSelected}>
            <label>Planeta</label>
            <select onChange={handleSelected}>
                <option defaultValue="Selecione um planeta">
                    Selecione um planeta
                </option>
                {context.planetArray && context.planetArray.length > 0 && context.planetArray.map((planet) => (
                    <option key={planet.name} value={planet.url}>{planet.name}</option>
                ))}
                
            </select>
            <button onClick={handleSelected}>Pesquisar</button>
        </form>
    </div>
  )
}

export default Filter