import './Square.css';
import roverIcon from '../assets/rover.png';

export default function Square(props) {

    const roverPosition = props.rover.getLocation();
    const squareCoor = props.coor;
    const roverDeg = translateOrientation(roverPosition[1]);
    const isRoverHere = roverPosition[0].every((val, index) => val === squareCoor[index]);

    return (
        <div className={`square ${props.coordinates}`}>
            {isRoverHere && <img alt='' src={roverIcon} style={{transform: `rotate(${roverDeg}deg)`}}/>}
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