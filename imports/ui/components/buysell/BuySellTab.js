import React from "react";
import { Tab, Tabs, TabList, TabPanel,Panel} from 'react-bootstrap';

import Home from '../home/Home';
import BuySell from './BuySell';
import SellPayment from "./SellPayment";
import BuyPayment from "./BuyPayment";
export default class BuySellTab extends React.Component{
    render(){
        return (
            <div className="tabsCustom">
                <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
                    <Tab eventKey={1} title="Buy">
                             <BuyPayment/>
                    </Tab>
                    <Tab eventKey={2} title="Sell"> 
                             <SellPayment/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
