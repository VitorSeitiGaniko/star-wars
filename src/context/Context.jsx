import React from 'react'

export const ContextPeople = React.createContext()

export function ContextProvider({ children }) {
    const [peopleArray, setPeopleArray] = React.useState([])
    const [planetArray, setPlanetArray] = React.useState([])

    return (
        <ContextPeople.Provider value={{ peopleArray, setPeopleArray, planetArray, setPlanetArray }}>
            {children}
        </ContextPeople.Provider>
    )
}