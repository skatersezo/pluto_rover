export default class Rover {

    constructor(gridSize = 15) {
        this.orientation = 0; // N, E, S, W
        this.position = [0, 0]; // (x, y)
        this.gridSize = gridSize;
        this.obstacles = this.loadObstacles(gridSize, 20);
    }
    
    move(command) {
        const commandChain = command.toUpperCase().split('');
        const incorrectCommand = commandChain.findIndex(i => /[^FBLR]/g.test(i));
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
            this.checkObstaclesAhead([this.position[0], this.position[1] + 1]);
            this.position[1]++;
            if (this.position[1] > this.gridSize) {
                this.position[1] = 0;
            }
        }
        
        if ((command === 'B' && this.orientation === 0) || (command === 'F' && this.orientation === 2)) {
            this.checkObstaclesAhead([this.position[0], this.position[1] - 1]);
            this.position[1]--;
            if (this.position[1] < 0) {
                this.position[1] = this.gridSize;
            }
        }

        if ((command === 'F' && this.orientation === 1) || (command === 'B' && this.orientation === 3)) {
            this.checkObstaclesAhead([this.position[0] + 1, this.position[1]]);
            this.position[0]++;
            if (this.position[0] > this.gridSize) {
                this.position[0] = 0;
            }
        }
        
        if ((command === 'B' && this.orientation === 1) || (command === 'F' && this.orientation === 3)) {
            this.checkObstaclesAhead([this.position[0] - 1, this.position[1]]);
            this.position[0]--;
            if (this.position[0] < 0) {
                this.position[0] = this.gridSize;
            }
        }
    }

    checkObstaclesAhead(position) {
        this.obstacles.forEach(obs => {
            if (obs.every((val, index) => val === position[index])) {
                const obstacleError = new Error();
                obstacleError.data = {
                    name: 'Obstacle',
                    desc: `A great obstacle was encountered in [${obs}]`
                };
                throw obstacleError;
            }
        });
    }

    loadObstacles(gridSize, obstaclesAmount) {
        const obstacles = [];
        for (let i = 0; i < obstaclesAmount; i++) {
            const x = Math.floor(Math.random() * gridSize);
            const y = Math.floor(Math.random() * gridSize);
            obstacles.push([x, y]);
        }
        return obstacles;
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