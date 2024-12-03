import React from 'react'
import styled from 'styled-components'
import { ContextPeople } from '../../context/Context'
import loadingImage from '../../assets/loading.webp'
import unknownImage from '../../assets/unknown.png'

const CardBox = styled.div`
    border: none;
    border-radius: 8px;

    width: 330px;
    height: 270px;
    padding: 22px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const CardImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 6px;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: var(--white);
`

const ImageLoading = styled.img`
    border: none;
    border-radius: 8px;

    width: 330px;
    height: 270px;
    opacity: 0.5;
`

function Card({person, filter}) {
    const URL_IMAGE = 'https://starwars-databank-server.vercel.app/api/v1/characters/name/'
    const context = React.useContext(ContextPeople)

    const [planetInfos, setPlanetInfos] = React.useState({})
    const [starshipInfos, setStarshipInfos] = React.useState([])
    const [specieInfos, setSpecieInfos] = React.useState([])
    const [image, setImage] = React.useState('')

	function getPlanetInfos(url) {
	    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok && response.status === 200) {
                    return response.json();
                } else {
                    reject(new Error('Failed to fetch data'));
                } 
            })
            .then(data => {
                setPlanetInfos(data);

                if (!filter && context.allowPush) {
                    context.setPlanetArray(prevArray => [...prevArray, data]);
                }
                resolve(data);
            })
            .catch(error => {
                console.error('erros: ', error);
                reject(error);
            });
        });
    }

    function getPersonStarship(url) {
        return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok && response.status === 200) {
                    return response.json();
                } else {
                    reject(new Error('Failed to fetch data'));
                }
            })
            .then(data => {
                setStarshipInfos(prevArray => [...prevArray, data]);
                if (!filter && context.allowPush) {
                    context.setStarshipArray(prevArray => [...prevArray, data]);
                }
                resolve(data);
            })
            .catch(error => {
                console.error('erros: ', error);
                reject(error);
            });
        });
    }

    function getPersonSpecie(url) {
        return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok && response.status === 200) {
                    return response.json();
                } else {
                    reject(new Error('Failed to fetch data'));
                }
            })
            .then(data => {
                setSpecieInfos(prevArray => [...prevArray, data]);
                if (!filter && context.allowPush) {
                    context.setSpecieArray(prevArray => [...prevArray, data]);
                }
                resolve(data);
            })
            .catch(error => {
                console.error('erros: ', error);
                reject(error);
            });
        });
    }

    function getPersonImage(name) {
        return new Promise((resolve, reject) => {
        fetch(`${URL_IMAGE}${name}`)
            .then(response => {
                if (response.ok && response.status === 200) {
                    return response.json();
                } else {
                    reject(new Error('Failed to fetch data'));
                }
            })
            .then(data => {
                if(data && data.length > 0) setImage(data[0].image);
                resolve(data);
            })
            .catch(error => {
                console.error('erros: ', error);
                reject(error);
            });
        });
    }

    function openModal(){
        context.setOpenModal(true)
        context.setPersonSelected(
            {
                person,
                planetInfos,
                starshipInfos,
                specieInfos,
                image
            }
        )
    }

    React.useEffect(() => {
        const promises = [];
        context.setLoading(true)

        promises.push(getPlanetInfos(person.homeworld));
    
        promises.push(getPersonImage(person.name));

        if (person.starships && person.starships.length > 0) {
            person.starships.forEach((starship) => {
                promises.push(getPersonStarship(starship));
            });
        }

        if (person.species && person.species.length > 0) {
            person.species.forEach((specie) => {
                promises.push(getPersonSpecie(specie));
            });
        }

        Promise.all(promises)
            .then(() => {
                context.setLoading(false)
            })
            .catch(error => {
                console.error('One or more promises failed', error);
            });
    }, [person])

return (
    <>
    {context.loading && (
        <ImageLoading src={loadingImage} alt="" />
    )}
        
    {!context.loading && (
        <CardBox onClick={openModal}> 
            <CardImage src={image || unknownImage} alt={person.name} />
            <Title>{person.name}</Title>
        </CardBox>
    )}
    </>
)}

export default Card