import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

/* interface GameResponse {
    count: number;
    results: Game[];
} */

interface Game {
    id: number;
    name: string;
}

const GameGrid = () => {
    const [games, setGames] = useState<Game[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        fetch("https://api.rawg.io/api/games?key=1ec25bdd10f6479a8203719b863d2aec",
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((response) => setGames(response.results))
            .catch((error) => setError( error.message));
    }, []);

    return <div>
        {error && <Text>{error}</Text>}
        <ul>
            {games.map(
                (game) => <li key={game.id}>{game.name}</li>
            )}
        </ul>
    </div>;
};

export default GameGrid;