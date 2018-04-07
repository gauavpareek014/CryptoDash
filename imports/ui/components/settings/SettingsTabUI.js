import React from "react";
import { Tab, Tabs, TabList, TabPanel,Panel} from 'react-bootstrap';
import MyProfile from "./MyProfile";

export default class AccountsTabUI extends React.Component{
    render(){
        return (
            <div className="tabsCustom">
                    <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
                        <Tab eventKey={1} title="My Profile">
                               <MyProfile/>
                        </Tab>
                        <Tab eventKey={2} title="Preferences">

                        </Tab>
                        <Tab eventKey={3} title="Other" >

                        </Tab>
                    </Tabs>

            </div>
        );
    }
}
