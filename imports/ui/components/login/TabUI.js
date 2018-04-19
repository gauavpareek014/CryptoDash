import React from "react";
import { Tab, Tabs, TabList, TabPanel,Panel} from 'react-bootstrap';
import Home from '../home/Home';
import BuySell from '../buysell/BuySell';
import Settings from '../settings/Settings';
import Account from '../accounts/Account';
import FaHome from 'react-icons/lib/fa/home'
import FaArrowH from 'react-icons/lib/fa/exchange'
import FaAccount from 'react-icons/lib/md/account-balance-wallet'
import FaSettings from 'react-icons/lib/md/perm-data-setting'
import FaSetup from 'react-icons/lib/md/phonelink-setup'
import AccountSetup from "../setup/AccountSetup";

export default class TabUI extends React.Component{
    render(){
        return (
            <div className="tabsCustom">
                <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
                    <Tab eventKey={1} title={<font-face><FaHome /> Home</font-face>}>
                        <Home/>
                    </Tab>
                    <Tab eventKey={2} title={<font-face><FaArrowH /> Buy/Sell</font-face>}>
                        <BuySell/>
                    </Tab>
                    <Tab eventKey={3} title={<font-face><FaAccount /> Account</font-face>}>
                        <Account/>
                    </Tab>
                    <Tab eventKey={4} title={<font-face><FaSettings /> Settings</font-face>}>
                        <Settings/>
                    </Tab>
                    <Tab eventKey={5} title={<font-face><FaSetup /> Setup</font-face>} >
                        <AccountSetup/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
