import React from "react";
import { Tab, Tabs, TabList, TabPanel,Panel,Glyphicon} from 'react-bootstrap';
import FaProfile from 'react-icons/lib/fa/user'
import FaLimit from 'react-icons/lib/md/lock'
import MyProfile from "./MyProfile";
import ConfigureLimit from "./ConfigureLimit";

export default class AccountsTabUI extends React.Component{
    render(){
        return (
            <div className="tabsCustom">
                <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
                    <Tab eventKey={1} title={<font-face><FaProfile /> My Profile</font-face>}>
                        <MyProfile/>
                    </Tab>
                    <Tab eventKey={2} title={<font-face><FaLimit /> Configure Limit</font-face>}>
                        <ConfigureLimit/>
                    </Tab>
                    <Tab eventKey={3} title="Other" >

                    </Tab>
                </Tabs>

            </div>
        );
    }
}
