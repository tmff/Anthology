import '../css/App.css';
import { Footer } from './Footer';
import Sidebar from './Sidebar';

export const Base = (props) => {
    return (
      <div>
        <div className='App'>
          { props.component }
          <div id='outer-container'>
            <div id='sidebar'>
              <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
}