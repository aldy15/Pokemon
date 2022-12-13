import { useEffect, useState } from "react";
import {
  Card,
  HStack,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Badge,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";

const Pagination = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || 1);

  const moveTo = (direction) => {
    if (direction === "prev") {
      // TODO: answer here
      navigate("/pokemon?page=" + (currentPage - 1));
    } else {
      // TODO: answer here
      navigate("/pokemon?page=" + (currentPage + 1));
    }
  };

  return (
    <HStack>
      <Button
        disabled={currentPage <= 1}
        style={{ margin: "5px 6px", padding: "4px 6px" }}
        onClick={() => moveTo("prev")}
      >
        Prev
      </Button>

      <Button
        style={{ margin: "5px 6px", padding: "4px 6px" }}
        onClick={() => moveTo("next")}
      >
        Next
      </Button>
    </HStack>
  );
};

const PokemonList = ({ pokemons }) => {
  return (
    pokemons &&
    pokemons.length > 0 && (
      <Box role="pokemon-list">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card>
              <CardHeader>
                <Heading as="h3" size="md">
                  {pokemon.name}
                </Heading>
              </CardHeader>
              <Stack direction={["column", "row"]} spacing="24px">
                <img
                  alt="Back Default"
                  src={pokemon.sprites.back_default}
                  style={{ height: "65px" }}
                />
                <img
                  alt="Back Shiny"
                  src={pokemon.sprites.back_shiny}
                  style={{ height: "65px" }}
                />
                <img
                  alt="Front Default"
                  src={pokemon.sprites.front_default}
                  style={{ height: "65px" }}
                />
                <img
                  alt="Front Shiny"
                  src={pokemon.sprites.front_shiny}
                  style={{ height: "65px" }}
                />
              </Stack>
              <HStack>
                <Link to="/">
                  <Button style={{ margin: "3px 7px", padding: "1px 2PX" }}>
                    GRASS
                  </Button>
                  <Link to="/">
                    <Button style={{ margin: "3px 7px", padding: "1px 2PX" }}>
                      POISON
                    </Button>
                  </Link>
                </Link>
              </HStack>
            </Card>
          </Link>
        ))}
      </Box>
    )
  );
};

const Home = () => {
  //get list
  const fetchPokemons = async (page) => {
    const displayPerPage = 20;
    const offset = (page - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    });

    //set pokemonList to state
    setPokemons(await Promise.all(pokemonList));
  };

  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    fetchPokemons(page);
  }, [searchParams]);

  return (
    <>
      <Heading as="h2" size="lg">
        Pokemon List
      </Heading>
      <Pagination />
      <PokemonList pokemons={pokemons} />
    </>
  );
};

export default Home;
