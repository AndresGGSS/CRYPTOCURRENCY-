import styled from '@emotion/styled'
import Form from './components/Form';
import Result from './components/Result';
import Spinner from './components/Spinner';
import ImageCryptos from './imagen-criptos.png'
import { useState, useEffect } from 'react';

const Container = styled.div`
max-width: 1100px;
margin: 0 auto;
width: 90%;
 @media (min-width: 992px){
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   column-gap: 2rem;
  }
`;

const Heading = styled.h1`
color: #fff;
font-family: 'Lato', sans-serif;
text-align: center;
font-weight: 700;
padding-top: 70px;
padding-bottom: 10px;
font-size: 40px;

&::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #5e18ec;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Image = styled.img`
padding-left: 100px;
width: 100%;
margin: 100px auto 0 auto;
display: block;
`;

function App() {

  const [coins, setCoins] = useState({})
  const [result, setResult] = useState({})
  const [charging, setCharging] = useState(false)

  useEffect(() => {
    if(Object.keys(coins).length > 0) {

      const quoteCrypto = async () => {
        setCharging(true)
        setResult({})

        const  { coin, cryptocoin } = coins 
        const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocoin}&tsyms=${coin}`

        const result = await fetch(url)
        const answer = await result.json() 

        setResult(answer.DISPLAY[cryptocoin][coin])

        setCharging(false)
      }

      quoteCrypto()
    }
  }, [coins])
  
  return (
    <Container>
      <div>
        <Heading>Cotizar Criptomonedas al instante</Heading>
        <Form
        setCoins={setCoins}
        />

        {charging && <Spinner/>}
        {result.PRICE && <Result result={result}/>}
      </div>

      <Image
        src={ImageCryptos}
        alt="Image Cryptos"
      />
    </Container>
  )
}

export default App
