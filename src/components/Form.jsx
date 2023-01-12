import styled from "@emotion/styled";
import useSelectCoins from "../hooks/useSelectCoins";
import { coins } from "./Data/coins";
import { useEffect, useState } from "react";
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #5e18ec;
    border: none;
    width: 100%;
    padding: 10px;
    color: #ffff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color:#0d26a2;
        cursor: pointer;
    }
`

const Form = ({setCoins}) => {

    const [cryptos, setCryptos] = useState ([])
    const [error, setError] = useState (false)

    const [ coin, SelectCoins ] = useSelectCoins('Elige tu moneda', coins)
    const [ cryptocoin, SelectCryptocoin ] = useSelectCoins('Elige tu Criptomoneda', cryptos)



    useEffect(() => {
        const queryAPI = async () => {
                const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
                const response = await fetch(url)
                const result = await response.json()

                const arrayCriptos = result.Data.map( crypto => {
                    const objet = {
                        id: crypto.CoinInfo.Name,
                        nombre: crypto.CoinInfo.FullName
                    }
                    return objet 
                })

                setCryptos(arrayCriptos)
        }
        queryAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if ([coin, cryptocoin].includes("")) {
            setError(true)
            return
        }
        setError(false)
        setCoins({
            coin,
            cryptocoin,
        })
    }

    return (
        <>
            {error && <Error> Todos los campos son obligatorios </Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCoins/>
                <SelectCryptocoin/> 

                <InputSubmit
                    type="submit" 
                    value="Cotizar"
               />
            </form>
        </>
    )
}
 
export default Form 