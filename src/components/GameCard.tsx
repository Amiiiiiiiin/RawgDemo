import { Card, CardBody, Image, Heading } from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import PlatformIconsList from './PlatformIconsList';
import CriticScore from './CriticScore';
import getCroppendImageUrl from '../services/image-crop';

interface Props {
    game: Game;
}


const GameCard = ({ game }: Props) => {
    return (
        <Card>
            <Image src={getCroppendImageUrl(game.background_image)}></Image>
            <CardBody>
                <PlatformIconsList
                    platforms={game.parent_platforms.map((pp) => pp.platform)}
                />
                <CriticScore score={game.metacritic} />
                <Heading fontSize="2x1">{game.name}</Heading>
            </CardBody>
        </Card>
    );
}

export default GameCard;