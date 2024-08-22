import './App.css';
import PokeCards from './Components/PokeCards';
import Titulo from './Components/Titulo';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [imagem, setImagem] = useState('');
  const [tipo, setTipo] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [pokeBusca, setPokeBusca] = useState('1');
  const [fundoImg, setFundoImg] = useState('');

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

  useEffect(() => {
    // Function to fetch Pokémon data
    const fetchPokemons = async () => {
      try {
        const pokemonPromises = [];
        for (let i = 1; i <= 10; i++) {
          pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        const responses = await Promise.all(pokemonPromises);
        const pokes = responses.map(response => {
          const data = response.data;
          return {
            cod: data.id,
            nome: data.name,
            imagem: data.sprites.front_default,
            tipo: data.types[0].type.name,
            peso: data.weight,
            altura: data.height,
          };
        });
        setPokemons(pokes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeBusca}`);
        setNome(response.data.name);
        setId(response.data.id);
        setImagem(response.data.sprites.front_default);
        setTipo(response.data.types[0].type.name);
        setPeso(response.data.weight);
        setAltura(response.data.height);
        if (response.data.types[0].type.name === 'fire') {
          setFundoImg('https://www.publicdomainpictures.net/pictures/400000/velka/marmoriert-rot-hintergrund-textur.jpg');
        } else if (response.data.types[0].type.name === 'electric') {
          setFundoImg('https://st.depositphotos.com/1605581/4781/i/450/depositphotos_47819249-stock-illustration-%20abstract-yellow-background-texture-design.jpg');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonDetails();
  }, [pokeBusca]);

  return (
    <>
      <Titulo />
      <form>
        <input type="text" name="pokemon" id="pokemon" onChange={e => setPokeBusca(e.target.value)} />
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
                <img style={{ width: "230px", padding: 0, margin: 0 }} src={imagem} alt={nome} />
                <h5>Tipo: {tipo}</h5>
                <h5>Altura: {altura}</h5>
                <h5>Peso: {peso}</h5>
              </Typography>
            </Box>
          </Modal>
        </div>
      </form>
      <div className='CardsP'>
        {pokemons.map(p => (
          <PokeCards
            key={p.cod} // Adding a key prop for React list rendering
            cod={p.cod}
            nome={p.nome}
            imagem={p.imagem}
            tipo={p.tipo}
            altura={p.altura}
            peso={p.peso}
          />
        ))}
      </div>
    </>
  );
}
