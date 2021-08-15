import './Square.css';
import roverIcon from '../assets/rover.png';
import rockIcon from '../assets/stone.png';
import _ from 'lodash';

export default function Square(props) {

    const roverPosition = props.rover.getLocation();
    const squareCoor = props.coor;
    const roverDeg = translateOrientation(roverPosition[1]);
    const isRoverHere = _.isEqual(roverPosition[0], squareCoor);
    const isObstacleHere = props.rover.obstaclesFound.some(o => _.isEqual(o, squareCoor));

    return (
        <div className={`square ${props.coordinates}`}>
            {isRoverHere && <img alt='' src={roverIcon} style={{transform: `rotate(${roverDeg}deg)`}}/>}
            {isObstacleHere && <img alt='' src={rockIcon} />}
        </div>
    );
}

function translateOrientation(orientation) {
    switch (orientation) {
        case 'N':
            return 0;
        case 'E':
            return 90;
        case 'S':
            return 180;
        case 'W':
            return 270;
        default:
            return 0;
    }
}