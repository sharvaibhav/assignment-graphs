import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./main.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import {faPlaneDeparture, faPlaneArrival, faClock } from '@fortawesome/free-solid-svg-icons'

library.add([faPlaneDeparture,faPlaneArrival,faClock])


ReactDOM.render(<App/>,document.getElementById('app'));