import React, {Component} from "react";
import ReactDOM from 'react-dom';
// import style from './index.css';
import axios from 'axios';
import PlayByPlay from './components/PlayByPlay/PlayByPlay.js'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            data: {},
            plays: [],
            gameStats: [],
            nav: [],
            footer: {}
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('https://my-json-server.typicode.com/fanduel/moneyball-fe-challenge-data/db').then(response => {
            this.setState({data: response.data, gameStats: response.data.game_stats, plays: response.data.plays, nav: response.data.nav_elements, footer: response.data.footer_scoreboard})
        })
    }

    createNav(data){
        const navData = this.state.nav;
        let navItems = []

        for(let i = 0; i < navData.length; i++) {
            navItems.push(navData[i].title);   
        }
        
        return navItems.map( nav => {
                return (
                    <li>{nav}</li>
                )
            }
        )
    }

    createPlayByPlay(data){
        const gameData = this.state.plays;
        return gameData.map(plays => {
            return (
                <div className="stat" key={plays.id}>
                    <div className="statInfo">
                        <span className="time">{plays.time_left}</span>
                        <span className="quarter">{plays.quarter}</span>
                        <div className="summary">
                            {plays.description}
                        </div>
                    </div>
                </div>               
            )
        })
    }

    render() {
        return (
            <div>
                <nav>
                    <ul class="mobileMainNav">
                        <li></li>
                    </ul>
                    <ul class="secondary">
                        <li><img src="../assets/img/FD_frontend_01.png" class="logo" /></li>
                        <li>{this.createNav()}</li>
                    </ul>
                    <ul class="account">
                        <li>Help <span class="drop"></span></li>
                        <li><img src="../assets/img/FD_frontend_03.png" class="accountIcon" /> <span class="accountName">nbanaddio</span><span class="dropWhite push"></span> </li>
                        <li>
                            <span class="bal">
                                <span class="accountBal">$1,000,000 </span>
                                <span class="bal">Balance</span>
                            </span>
                            <button class="addFunds" value="Add funds">Add funds</button>
                        </li>
                    </ul>
                </nav>
                <div  className="wrapper">
                {this.createPlayByPlay()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("index"));
