import './PokeCards.css'
export default function PokeCards(props) {
    return (
        <>
            <div className="cardP">
                <h2>{props.cod}</h2>
                <img src={props.imagem} alt="" />
                <h2>{props.nome}</h2>
                <h3>Tipo: {props.tipo}</h3>
                <p>Peso: {props.peso}</p>
                <p>Altura: {props.altura}</p>
            </div>
        </>
    )
}