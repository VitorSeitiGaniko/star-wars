import React from 'react'

export const ContextPeople = React.createContext()

export function ContextProvider({ children }) {
    const [peopleArray, setPeopleArray] = React.useState([])
    const [peopleArrayLength, setPeopleArrayLength] = React.useState([])
    const [peopleFilteredArray, setPeopleFilteredArray] = React.useState([])
    const [planetArray, setPlanetArray] = React.useState([])
    const [starshipArray, setStarshipArray] = React.useState([])
    const [specieArray, setSpecieArray] = React.useState([])
    const [isFilterList, setIsFilterList] = React.useState(false)

    const [personSelected, setPersonSelected] = React.useState('')
    const [allowPush, setAllowPush] = React.useState(true)
    const [remove, setRemove] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [lazyLoading, setLazyLoading] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)

    const [nextPage, setNextPage] = React.useState('')
    const [prevPage, setPrevPage] = React.useState('')
    const [topic_Search, setTopic_Search] = React.useState(false)

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
            specieArray,
            setSpecieArray,
            isFilterList, 
            setIsFilterList,
            remove,
            setRemove,
            loading,
            setLoading,
            openModal,
            setOpenModal,
            personSelected,
            setPersonSelected,
            nextPage,
            setNextPage,
            prevPage,
            setPrevPage,
            allowPush,
            setAllowPush,
            lazyLoading,
            setLazyLoading,
            topic_Search,
            setTopic_Search,
            peopleArrayLength,
            setPeopleArrayLength
        }}>
            {children}
        </ContextPeople.Provider>
    )
}