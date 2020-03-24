import React from 'react';
import { Link } from 'react-router-dom';
import BizCaroussel from '../swipe/caroussel/biz_caroussel';
import BizInfo from '../swipe/biz_info/biz_info';
import SwipeMainMap from './swipe_main_map';
import './swipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';

class Swipe extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBusinesses();
  }
  
  render() {
    if (_.isEmpty(this.props.businesses)){
      return null;
    }

    return (
      <div className="swipe">
        <div className="swipe-aside">
          <div className="swipe-aside-nav">
            <div className="nav-logo">
              <Link to="/home">⌘</Link>
            </div>
            <h2 className="welcome-swipe">Hi Henry!</h2>
            <div className="logout-container">
              <Link
                className="logout-logo"
                onClick={this.props.logout}
                to="/"
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  color="white"
                  size="2x"
                />
              </Link>
            </div>
          </div>
          <div className="caroussel">
            <BizCaroussel />
          </div>
          <div className="business-info">
            <BizInfo business={this.props.businesses[0]} />
          </div>
          <div className="like-or-dislike">
            <div className="like-or-dislike-container">
              <span className="like">
                <FontAwesomeIcon icon={faCheck} color="white" size="2x" />
              </span>
              <span className="dislike">
                <FontAwesomeIcon icon={faTimes} color="white" size="2x" />
              </span>
            </div>
          </div>
        </div>
        <div className="swipe-main">
          <SwipeMainMap businesses={this.props.businesses} />
        </div>
      </div>
    );
  }
};

export default Swipe;
