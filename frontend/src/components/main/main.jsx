import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

class Main extends React.Component {
    render(){
        return(
            <div className="main">
                <section className="background-container">
                    <video playsInline autoPlay muted loop id="background-video">
                        <source src="video.mp4" type="video/mp4" />
                    </video>
                </section>
                <section>
                    <div className="splash-content">
                        <h1>Eat Together</h1>
                        <h4>We help you make dinner plans, so you can focus on the more important things</h4>
                        <div className="main-buttons-container">
                            <button className='main-button-signup'> <Link onClick={this.props.clearUpData} to="/onboarding">SIGN UP</Link></button>
                            <button className='main-button-login' onClick={() => this.props.openModal('login')}>LOG IN</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default Main;
