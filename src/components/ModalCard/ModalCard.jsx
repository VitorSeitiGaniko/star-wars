import React from 'react'
import styled from 'styled-components'

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
    height: 112px;
    width: 600px;
    padding: 24px;
`

function ModalCard() {
  return (
    <Overlay>
        <Container>
            <Modal></Modal>
        </Container>
    </Overlay>
  )
}

export default ModalCard