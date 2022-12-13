import { useMemo, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const PokemonLegend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const password = query.get("password");

  useEffect(() => {
    if (password !== "secret")
      return navigate("/unauthorized", { replace: true, state: location });
  }, [location]);

  return (
    <Image
      alt="Arceus"
      src="https://archives.bulbagarden.net/media/upload/thumb/f/fc/493Arceus.png/250px-493Arceus.png"
    />
  );
};

export default PokemonLegend;

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
