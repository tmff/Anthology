import '../css/App.css';
import Sidebar from './Sidebar';

export const Base = (props) => {
    return (
      <div className='App'>
        { props.component }
        <div id='outer-container'>
          <div id='sidebar'>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
          </div>
        </div>
      </div>
    )
}