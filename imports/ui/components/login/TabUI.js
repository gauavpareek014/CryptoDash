import React from "react";
import { Tab, Tabs, TabList, TabPanel,Panel} from 'react-bootstrap';
import Home from '../home/Home';
import BuySell from '../buysell/BuySell';
import Settings from '../settings/Settings';
import Account from '../accounts/Account';
import FaHome from 'react-icons/lib/fa/home'
import FaArrowH from 'react-icons/lib/fa/arrows-h'
import FaAccount from 'react-icons/lib/md/account-balance-wallet'
import FaSettings from 'react-icons/lib/md/settings-applications'

export default class TabUI extends React.Component{
    render(){
        return (
           <div className="tabsCustom">
            <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
                <Tab eventKey={1} title="Home">
                    <Home/>
                </Tab>
                <Tab eventKey={2} title="Buy/Sell">
                    <BuySell/>
                </Tab>
                <Tab eventKey={3} title="Account" >
                    <Account/>
                </Tab>
                <Tab eventKey={4} title="Settings" >
                    <Settings/>
                </Tab>
            </Tabs>
           </div>
        );
    }
}
