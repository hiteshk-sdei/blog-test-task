import React from 'react';
import Header from './Header';
import './Layout.scss'

const Layout = (props) => {
    return(
        <div className='app'>
            <Header/>
            <div className='app-wrapper'>
                <div className='app-body'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
export default Layout;