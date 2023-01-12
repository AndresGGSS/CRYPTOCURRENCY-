import styled from "@emotion/styled"

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 100px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 5px #5e18ec;
`

const Text = styled.p`
    color: #000;
    font-family: 'Lato', sans-serif;
    span {
        font-weight: 700;
        color: #da0914;
    }
`

const Price = styled.p`
    color: #000;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    span {
        font-weight: 700;
        color: #da0914;
    }
`
const Image = styled.img`
    display: block;
    width: 120px;
    margin-left: 10px;
`

const Result = ({result}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} =result
  return (
    <Container>
        <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Crypto" />
        <div>
            <Price>El precio actual es de: <span>{PRICE}</span></Price>
            <Text>El precio más alto del día: <span>{HIGHDAY}</span></Text>
            <Text>El precio más bajo del día: <span>{LOWDAY}</span></Text>
            <Text>Variación de las últimas 24 Horas: <span>{CHANGEPCT24HOUR}%</span></Text>
            <Text>Última actualización: <span>{LASTUPDATE}</span></Text>
        </div>
    </Container>
  )
}

export default Result