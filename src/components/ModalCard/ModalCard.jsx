import React from 'react'
import styled from 'styled-components'
import { ContextPeople } from '../../context/Context'
import unknownImage from '../../assets/unknown.png'

const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0px;
    left: 0px;
    background-color: black;
    opacity: 0.3;
    z-index: 9998;
`

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: auto;
    transform: translate(-50%, -50%);
    height: auto;
    z-index: 9999;
`

const Modal = styled.div`
    background: #fff;
    border-radius: 8px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80vh;
    width: 600px;
    padding: 32px;
    color: var(--black);
    overflow-y: auto;
`

const Image = styled.img`
    width: 100%;
    height: 330px;
    object-fit: cover;
    border-radius: 6px;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: var(--black);
`

const Subtitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: var(--black);
`

function ModalCard() {
    const context = React.useContext(ContextPeople)

    return (
        <>
            {context.openModal && (
            <>
            <Overlay onClick={() => context.setOpenModal(false)}>
            </Overlay>
            <Container>
                <Modal>
                    <Image src={context.personSelected.image || unknownImage} alt={context.personSelected.person.name} />
                    <Title>Nome: {context.personSelected.person.name}</Title>
                    <p>Altura(m) {context.personSelected.person.height}</p>
                    <p>Peso(Kg) {context.personSelected.person.mass}</p>
                    <p>Gênero {context.personSelected.person.gender}</p>
                    <p>Ano de Nascimento {context.personSelected.person.birth_year}</p>
                    <p>Quantidade de filmes {context.personSelected.person.films.length}</p>

                    {context.personSelected.planetInfos && (
                        <Subtitle>Planeta</Subtitle>
                    )}
                    {context.personSelected.planetInfos && <p>Nome {context.personSelected.planetInfos.name}</p>}
                    {context.personSelected.planetInfos && <p>Terreno {context.personSelected.planetInfos.terrain}</p>}
                    {context.personSelected.planetInfos && <p>Clima {context.personSelected.planetInfos.climate}</p>}
                    {context.personSelected.planetInfos && <p>População {context.personSelected.planetInfos.population}</p>}


                    {context.personSelected.starshipInfos && context.personSelected.starshipInfos.length > 0 &&
                        <Subtitle>Nave</Subtitle>
                    }
                    {context.personSelected.starshipInfos && context.personSelected.starshipInfos.length > 0 && context.personSelected.starshipInfos.map((starship, index) => (
                        <p key={starship.name + index}>Nave {starship.name}</p>
                    ))}

                    {context.personSelected.specieInfos && context.personSelected.specieInfos.length > 0 &&
                        <Subtitle>Espécie</Subtitle>
                    }
                    {context.personSelected.specieInfos && context.personSelected.specieInfos.length > 0 && context.personSelected.specieInfos.map((specie, index) => (
                        <p key={specie.name + index}>Espécie {specie.name}</p>
                    ))}
                </Modal>
            </Container>
            </>
            )}
        </>
)}

export default ModalCard