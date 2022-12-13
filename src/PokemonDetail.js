import { useEffect, useState } from "react";
import {
  Badge,
  Tr,
  Td,
  HStack,
  VStack,
  Heading,
  Box,
  Link,
  Card,
  CardHeader,
  Button,
  TableContainer,
} from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Table } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";

const Detail = ({ pokemon }) => {
  return (
    <Box>
      {pokemon && (
        <Box role="pokemon-detail">
          <Card>
            <CardHeader>
              <Heading as="h3" size="md">
                {pokemon.name}
              </Heading>
              <HStack>
                <Link to="/">
                  <Button style={{ margin: "3px 7px", padding: "1px 2PX" }}>
                    GRASS
                  </Button>
                  <Link to="/">
                    <Button style={{ margin: "3px 3px", padding: "1px 2PX" }}>
                      POISON
                    </Button>
                  </Link>
                </Link>
              </HStack>
            </CardHeader>
            <HStack direction={["column", "row"]} spacing="24px">
              <img
                src={pokemon.sprites.back_default}
                style={{ height: "65px" }}
              />
              <img
                src={pokemon.sprites.back_shiny}
                style={{ height: "65px" }}
              />
              <img
                src={pokemon.sprites.front_default}
                style={{ height: "65px" }}
              />
              <img
                src={pokemon.sprites.front_shiny}
                style={{ height: "65px" }}
              />
            </HStack>
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Height</Td>
                    <Td>{pokemon.height}</Td>
                  </Tr>
                  <Tr>
                    <Td>Weight</Td>
                    <Td>{pokemon.weight}</Td>
                  </Tr>
                  <Tr>
                    <Td>Base Experience</Td>
                    <Td>{pokemon.base_experience}</Td>
                  </Tr>
                  <Tr>
                    <Td>Abilities</Td>
                    <Td>
                      {pokemon.abilities.map((el) => (
                        <p>{el.ability.name}</p>
                      ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Stats</Td>
                    <Td>
                      {pokemon.stats.map((el) => (
                        <p>
                          {el.stat.name} : {el.base_stat}
                        </p>
                      ))}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      )}
    </Box>
  );
};
const Page = () => {
  //TODO: read pokemonId frsom parameter
  const { pokemonId } = useParams(); // TODO: replace this
  const [pokemon, setPokemon] = useState(null);
  // console.log(pokemonId);

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    // TODO: answer here
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  return <Detail pokemon={pokemon} />;
};

export default Page;
