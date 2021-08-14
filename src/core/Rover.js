export default class Rover {

    constructor(gridSize = 100) {
        this.orientation = 0; // N, E, S, W
        this.position = [0, 0]; // (x, y)
        this.gridSize = gridSize;
    }

    
    move(command) {
        const commandChain = command.toUpperCase().split('');
        const incorrectCommand = commandChain.findIndex(i => /[^FBLRfblr]/g.test(i));
        if (incorrectCommand > -1) {
            const commandError = new Error();
            commandError.data = {
                name: 'Command Error',
                desc: `An incorrect command found in position ${incorrectCommand}`
            };
            throw commandError;
        } 
        commandChain.forEach(command => this.execute(command));
    }
    
    execute(command) {
        if (command === 'R') {
            this.orientation++;
            if (this.orientation > 3) {
                this.orientation = 0;
            }
        }
        
        if (command === 'L') {
            this.orientation--;
            if (this.orientation < 0) {
                this.orientation = 3;
            }
        }
        
        if ((command === 'F' && this.orientation === 0) || (command === 'B' && this.orientation === 2)) {
            this.position[1]++;
            if (this.position[1] > this.gridSize) {
                this.position[1] = 0;
            }
        }
        
        if ((command === 'B' && this.orientation === 0) || (command === 'F' && this.orientation === 2)) {
            this.position[1]--;
            if (this.position[1] < 0) {
                this.position[1] = this.gridSize;
            }
        }

        if ((command === 'F' && this.orientation === 1) || (command === 'B' && this.orientation === 3)) {
            this.position[0]++;
            if (this.position[0] > this.gridSize) {
                this.position[0] = 0;
            }
        }
        
        if ((command === 'B' && this.orientation === 1) || (command === 'F' && this.orientation === 3)) {
            this.position[0]--;
            if (this.position[0] < 0) {
                this.position[0] = this.gridSize;
            }
        }
    }

    getLocation() {
        let facing;
        switch(this.orientation) {
            case 0:
                facing = 'N';
                break;
            case 1:
                facing = 'E';
                break;
            case 2:
                facing = 'S';
                break;
            case 3:
                facing = 'W';
                break;
            default:
                throw new Error('Error in orientation');
        }
        return [this.position, facing];
    }
}