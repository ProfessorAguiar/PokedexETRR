import { useState } from 'react';
import './PokeCards.css'
import axios from 'axios';
export default function PokeCards() {
    const [nome,setNome]=useState('')
    const [imagem,setImagem]=useState('')
    const [tipo,setTipo]=useState('')
    const [peso,setPeso]=useState('')
    const [altura,setAltura]=useState('')
    axios.get('https://pokeapi.co/api/v2/pokemon/5')
        .then(function (response) {
            setNome(response.data.name)
            setImagem(response.data.sprites.front_default)
            setTipo(response.data.types[0].type.name)
            setPeso(response.data.weight)
            setAltura(response.data.height)
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    return (
        <>
            <section>
                <article>
                    <img style={{ width: "130px" }} src={imagem} />
                </article>
                <article>
                    <h4>{nome}</h4>
                    <p>Tipo:{tipo}</p>
                    <p>Altura:{altura}</p>
                    <p>Peso:{peso}</p>
                </article>
            </section>
        </>
    )
}