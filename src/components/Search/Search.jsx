import React from 'react'
import { ContextPeople } from '../../context/Context'

function Search() {
    const context = React.useContext(ContextPeople)
    const URL_SEARCH = 'https://swapi.dev/api/people/?search='

    const [inputSearch, setInputSearch] = React.useState('')

    async function handleSubmit(event){
        event.preventDefault()
        context.setIsFilterList(false)
        context.setNextPage('')
        context.setPrevPage('')

        try{
            const response = await fetch(`${URL_SEARCH}${inputSearch}`)
            if(response.ok && response.status === 200){
                const data = await response.json()
                console.log('DATA SEARCH  ==> ', data);
                
                context.setPlanetArray([])
                context.setStarshipArray([])
                context.setSpecieArray([])
                context.setRemove(true)
                context.setPeopleArray(data.results)
                context.setAllowPush(true)

                if(data.previous) context.setPrevPage(data.previous)
                if(data.next) context.setNextPage(data.next)
            }
        }

        catch(error){   
            console.error('erros: ', error)
        }
    }

    return (
        <>
        {!context.loading && (
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
        )}
        </>
    )
}

export default Search