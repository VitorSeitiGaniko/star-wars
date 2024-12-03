import React from 'react'
import styled from 'styled-components'
import loadingImage from '../../assets/loading.webp'

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

function Loading() {
    return (
        <Overlay>
            <Container>
                <img src={loadingImage} alt="" />
            </Container>
        </Overlay>
    )
}

export default Loading