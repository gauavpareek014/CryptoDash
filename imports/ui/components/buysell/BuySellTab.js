import React from "react";
import { Tab, Tabs, TabList, TabPanel,Panel} from 'react-bootstrap';
import FaBuy from 'react-icons/lib/fa/long-arrow-right'
import FaSell from 'react-icons/lib/fa/long-arrow-left'
import Home from '../home/Home';
import BuySell from './BuySell';
import SellPayment from "./SellPayment";
import BuyPayment from "./BuyPayment";
export default class BuySellTab extends React.Component{
    render(){
        return (
            <div className="tabsCustom">
                <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
                    <Tab eventKey={1} title={<font-face><FaBuy /> Buy</font-face>}>
                        <BuyPayment/>
                    </Tab>
                    <Tab eventKey={2} title={<font-face><FaSell /> Sell</font-face>}>
                        <SellPayment/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
