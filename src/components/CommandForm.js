import './CommandForm.css';

export default function CommandForm(props) {

    const submitHandler = event => {
        event.preventDefault();
        // send up
    }

    return (
        <form className='command-form' onSubmit={submitHandler}>
            <input id='command' type='text' placeholder='Introduce commands' />
            <button>Send</button>
        </form>
    );
}