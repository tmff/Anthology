
import '../css/App.css';

export const Title = (props) => {
    
    return (
        <div className="App">
            <header />
            <div className='app-header'> 
                <div className='app-Title'>Anthology.</div>
            </div>
            { props.component }
        </div>
    )
}