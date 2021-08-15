import Rover from '../core/Rover';

test('Takes one F command.', () => {

    const rover = new Rover();
    rover.obstacles = [];

    rover.move('F');

    expect(rover.getLocation()).toEqual([[0,1], 'N']);
});

test('Takes a chain of commands moving forwards.', () => {

    const rover = new Rover();
    rover.obstacles = [];

    rover.move('FFRFF');

    expect(rover.getLocation()).toEqual([[2,2], 'E']);
});

test('Takes a chain of commands using all available.', () => {

    const rover = new Rover();
    rover.obstacles = [];

    rover.move('FFRFFFLBB');

    expect(rover.getLocation()).toEqual([[3,0], 'N']);
});

test('Wraps the grid when moving to the North and appears in the South', () => {

    const rover = new Rover(10);
    rover.obstacles = [];

    rover.move('FFFFFFFFFFFF');

    expect(rover.getLocation()).toEqual([[0,1], 'N']);
});

test('Wraps the grid when moving to the South and appears in the North', () => {

    const rover = new Rover(10);
    rover.obstacles = [];

    rover.move('BBBB');

    expect(rover.getLocation()).toEqual([[0,7], 'N']);
});

test('Wraps the grid when moving to the East and appears in the West', () => {

    const rover = new Rover(10);
    rover.obstacles = [];

    rover.move('RFFFFFFFFFFFF');

    expect(rover.getLocation()).toEqual([[1,0], 'E']);
});

test('Wraps the grid when moving to the West and appears in the East', () => {

    const rover = new Rover(10);
    rover.obstacles = [];

    rover.move('LFFF');

    expect(rover.getLocation()).toEqual([[8,0], 'W']);
});

test('It accepts commands in lowercase', () => {

    const rover = new Rover();
    rover.obstacles = [];

    rover.move('lfff');

    expect(rover.getLocation()).toEqual([[13,0], 'W']);
});

test('Throws if receives an incorrect command', () => {

    const rover = new Rover();
    rover.obstacles = [];
    let err;

    try {
        rover.move('RFFBNLFFF');
    } catch (e) {
        err = e;
    }

    expect(err.data).toEqual({ name: 'Command Error', desc: 'An incorrect command found in position 4' });
});

test('Reports an obstacle encountered and stays the last position available', () => {

    const rover = new Rover(10);
    rover.obstacles = [[3, 0]];
    let err = null;

    try {
        rover.move('RFFFLFFF');
    } catch (e) {
        err = e;
    }
    expect(err.data).toEqual({ name: 'Obstacle', desc: 'A great obstacle was encountered in [3,0]' });
    expect(rover.getLocation()).toEqual([[2, 0], 'E']);
});

