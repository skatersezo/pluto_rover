import { useRef } from 'react';
import './CommandForm.css';

export default function CommandForm(props) {

    const commandInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const commands = commandInputRef.current.value;

        props.onLoadCommands(commands);
        commandInputRef.current.value = '';
    }

    return (
        <form className='command-form' onSubmit={submitHandler}>
            <input id='command' type='text' placeholder='Introduce commands (F, B, R, L)' ref={commandInputRef} />
            <button type='submit'>Send</button>
        </form>
    );
}