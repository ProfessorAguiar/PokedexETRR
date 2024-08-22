import './App.css'
import PokeCards from './Components/PokeCards'
import Titulo from './Components/Titulo'
import { Suspense, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

export default function App() {
  const [Pokemons, setPokemons] = useState([])
  const pokes = []
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 190,
    height: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,

  };
  const [nome, setNome] = useState('')
  const [id, setId] = useState('')
  const [imagem, setImagem] = useState('')
  const [tipo, setTipo] = useState('')
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [pokeBusca, setPokebusca] = useState('1')
  const [fundoImg, setFundoImg] = useState('')
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeBusca}`)
    .then(function (response) {
      setNome(response.data.name)
      setId(response.data.id)
      setImagem(response.data.sprites.front_default)
      setTipo(response.data.types[0].type.name)
      setPeso(response.data.weight)
      setAltura(response.data.height)
      // console.log(response.data)
      if (tipo == 'fire') {
        setFundoImg('https://www.publicdomainpictures.net/pictures/400000/velka/marmoriert-rot-hintergrund-textur.jpg')
      } else if (tipo == 'electric') {
        setFundoImg('https://st.depositphotos.com/1605581/4781/i/450/depositphotos_47819249-stock-illustration-%20abstract-yellow-background-texture-design.jpg')
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  useEffect(() => {
    for (let i = 1; i < 11; i++) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(function (response) {
          // console.log(response.data)
          const PokeObj = {
            cod: response.data.id,
            nome: response.data.name,
            imagem: response.data.sprites.front_default,
            tipo: response.data.types[0].type.name,
            peso: response.data.weight,
            altura: response.data.height,
          }
          pokes.push(PokeObj)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    console.log(pokes)
    setPokemons(pokes)
  }, [])


  return (
    <>
      <Titulo />
      <form>
        <input type="text" name="pokemon" id="pokemon" onChange={e => setPokebusca(e.target.value)} />
        <Button onClick={handleOpen}>buscar</Button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ backgroundImage: `URL(${fundoImg})` }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h4>{nome}({id})</h4>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <img style={{ width: "230px", padding: 0, margin: 0 }} src={imagem} />
                <h5>Tipo:{tipo}</h5>
                <h5>Altura:{altura}</h5>
                <h5>Peso:{peso}</h5>
              </Typography>
            </Box>
          </Modal>
        </div>
      </form>
      <div className='CardsP'>
      {
        Pokemons.map((p) =>
          <PokeCards
            
            cod={p.cod}
            nome={p.nome}
            imagem={p.imagem}
            tipo={p.tipo}
            altura={p.altura}
            peso={p.peso}
          />
        )
      }
</div>
    </>
  )
}