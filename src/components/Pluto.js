
import CommandForm from './CommandForm';
import Rover from '../core/Rover';
import Square from './Square';

export default function Pluto() {

    const rover = new Rover();
    const gridSize = rover.gridSize;

    rover.obstacles = generateObstacles(gridSize, 20);

    const planetRows = [];

    for (let i = gridSize - 1; i >= 0; i--) {
        const planetColumns = [];
        for (let j = 0; j < gridSize; j++) {
            planetColumns.push(<Square coordinates={[j, i]} />)
        }
        planetRows.push(<div className={`row-${i}`}>{planetColumns}</div>);
    }

    return (
        <div className="pluto">
            {planetRows}
            <CommandForm />
        </div>
    );
};

function generateObstacles(gridSize, obstaclesAmount) {

    const obstacles = [];
    for (let i = 0; i < obstaclesAmount; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        obstacles.push([x, y]);
    }
    return obstacles;
}