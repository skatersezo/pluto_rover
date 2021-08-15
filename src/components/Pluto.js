
import { useState } from 'react';
import CommandForm from './CommandForm';
import Rover from '../core/Rover';
import Square from './Square';

export default function Pluto() {

    const [rover, setRover] = useState(new Rover());
    const [planetRows, setPlanetRows] = useState(generatePlanetGrid(rover));
    
    const loadCommands = (commands) => {
        try {
            rover.move(commands);
            setRover(rover);
            setPlanetRows(generatePlanetGrid(rover));
        } catch (err) {
            setPlanetRows(generatePlanetGrid(rover));
            console.log(err.data.name);
            console.log(err.data.desc);
        }
    };

    return (
        <div className="pluto">
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
