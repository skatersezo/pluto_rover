
import { useState } from 'react';
import CommandForm from './CommandForm';
import Rover from '../core/Rover';
import Square from './Square';
import ErrorModal from './ErrorModal';

export default function Pluto() {

    const [rover, setRover] = useState(new Rover());
    const [planetRows, setPlanetRows] = useState(generatePlanetGrid(rover));
    const [error, setError] = useState();
    
    const loadCommands = (commands) => {
        try {
            rover.move(commands);
            setRover(rover);
            setPlanetRows(generatePlanetGrid(rover));
        } catch (err) {
            setError({
                title: err.data.name,
                message: err.data.desc
            });
            setPlanetRows(generatePlanetGrid(rover));
        }
    };

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div className="pluto">
            {error && <ErrorModal title={error.title} message={error.message} onDismiss={errorHandler} />}
            {planetRows}
            <CommandForm onLoadCommands={loadCommands} />
        </div>
    );
};

function generatePlanetGrid(rover) {
    const planetRows = [];
    for (let i = rover.gridSize - 1; i >= 0; i--) {
        const planetColumns = [];
        for (let j = 0; j < rover.gridSize; j++) {
            planetColumns.push(<Square key={`${j}${i}`} coor={[j,i]} rover={rover} />)
        }
        planetRows.push(<div key={i} className={`row-${i}`}>{planetColumns}</div>);
    }
    return planetRows;
}
