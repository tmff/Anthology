import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faPaperPlane, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

import '../css/ReadingRoom.css';


export const TheReadingRoom = (props) => {

  return (
    <div>
      <h1>The Reading Room</h1>
      <h4>Discover poetry by other writers</h4>

      <div className="row">
        <h3>Today's popular poems on <span class="highlight">Nature</span></h3>
        
        <div className="poem-container">
          {/* displays the popular poems */}
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#nature</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Colorado</h4>
              <p>Out of mountain mist,<br/>birds emerge like shadow poems,<br/>Trees listen quietly</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">hm3</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#nature</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>The River</h4>
              <p>Edge of a red cliff,<br/>Stone from an ancient sea bed,<br/>Water memories</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">_haikyou</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#nature</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Darkness Calling</h4>
              <p>Stars twinkle above,<br/>The night whispers secrets in,<br/>Peaceful and serene</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">lightsaber</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h3>Discover other poems on <span class="highlight">Nature</span></h3>
        {/* Here you can display other poems with their titles and authors */}
        <div className="poem-container">
          {/* displays the popular poems */}
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#nature</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Nature's Wonder</h4>
              <p>Nature's canvas vast,<br/>Ever-changing, yet constant,<br/>Wondrous and divine</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">_indigo</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#nature</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Rustling Leaves</h4>
              <p>Trees sway in the breeze,<br/>Rustling leaves sing a sweet tune,<br/>Nature's symphony</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">scriber123</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#nature</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Birds Flight</h4>
              <p>Birds soaring up high,<br/>Soaring on winds of freedom,<br/>Nature's poetry</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">quill</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h3>Discover previous poems</h3>
        {/* Here you can display previous poems with their titles, authors, and tags */}
        <div className="poem-container">
          {/* displays the popular poems */}
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#time</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#uplifting</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Time</h4>
              <p>The clock hands dance 'round,<br/>Measured beats of passing time,<br/>Everlasting flow</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">bluey2</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#fireflies</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Lights</h4>
              <p>Fireflies at dusk,<br/>Twinkling lights in the night sky,<br/>Magical delight</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">writer09</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
          <div className="poem">
          <div className="poem-tags">
          <div className="poem-tag">
             <a href="#" className="poem-tag-link">#sunset</a>
             </div>
              <div className="poem-tag">
                 <a href="#" className="poem-tag-link">#haiku</a>
              </div>
            </div>
            <div className="colored-block">
              <h4>Sunset</h4>
              <p>Colors fill the sky,<br/>Golden hues blend with deep blues,<br/>Peaceful evening calm</p>
              <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            </div>
            <div className="light-block">
              <div className="profile-info">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                <p className="username">raya3</p>
              </div>
              <div className="buttons">
                <FontAwesomeIcon icon={faHeart} className="button-icon" />
                <FontAwesomeIcon icon={faCommentDots} className="button-icon" />
                <FontAwesomeIcon icon={faPaperPlane} className="button-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheReadingRoom;

