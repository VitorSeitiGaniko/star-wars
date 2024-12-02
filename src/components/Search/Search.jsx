import React from 'react'
import { ContextPeople } from '../../context/Context'

function Search() {
    const context = React.useContext(ContextPeople)

    const [inputSearch, setInputSearch] = React.useState('')

    async function handleSubmit(event){
        event.preventDefault()
        context.setUsSearchList(false)


        try{
            const response = await fetch(`https://swapi.dev/api/people/?search=${inputSearch}`)
            if(response.ok && response.status === 200){
                const data = await response.json()
                console.log(data);
                
                context.setPlanetArray([])
                context.setStarshipArray([])
                context.setRemove(true)
                context.setPeopleArray(data.results)
            }
        }
    
        catch(error){   
            console.error('erros: ', error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Personagem</label>
                <input type="text" 
                    placeholder="Personagem"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}/>
                <button onClick={handleSubmit}>Pesquisar</button>
            </form>
        </div>
    )
}

export default Search