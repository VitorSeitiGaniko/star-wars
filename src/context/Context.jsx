import React from 'react'

export const ContextPeople = React.createContext()

export function ContextProvider({ children }) {
    const [peopleArray, setPeopleArray] = React.useState([])
    const [peopleFilteredArray, setPeopleFilteredArray] = React.useState([])
    const [isSearchList, setUsSearchList] = React.useState(false)
    const [planetArray, setPlanetArray] = React.useState([])
    const [starshipArray, setStarshipArray] = React.useState([])
    const [block, setBlock] = React.useState(false)
    const [remove, setRemove] = React.useState(false)

    return (
        <ContextPeople.Provider value={{ 
            peopleArray, 
            setPeopleArray, 
            peopleFilteredArray, 
            setPeopleFilteredArray, 
            planetArray, 
            setPlanetArray, 
            starshipArray,
            setStarshipArray,
            isSearchList, 
            setUsSearchList,
            block,
            setBlock,
            remove,
            setRemove
        }}>
            {children}
        </ContextPeople.Provider>
    )
}