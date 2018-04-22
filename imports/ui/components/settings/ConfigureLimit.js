import React from "react";
import {Meteor} from 'meteor/meteor';
import {Grid, Row, Col, Jumbotron,Form, FormGroup,Alert, ControlLabel, FormControl,Panel,Button} from 'react-bootstrap';
import ReactDOM from "react-dom";
import { withTracker } from 'meteor/react-meteor-data';
import {Limits} from '../../../api/limit';
import Limit from "./Limit";
class ConfigureLimit extends React.Component{

    constructor(props){
        super(props);
        let emailAddress;
        if(Meteor.user()){
            emailAddress = Meteor.user().emails[0].address;
        }
        this.state = {
            email:emailAddress,
            message:'',
            bstyle: 'info',
        };
    }

    renderTask(){
        let transactionLimit = this.props.limits;
        if(transactionLimit.length>0){
            return  transactionLimit.map((limit)=> {
                return(
                    <Limit key={limit._id}
                           limit ={limit}
                    />
                );
            });
        }else{
            limit = [];
            return(
                <Limit key={limit._id}
                       limit ={limit}
                />
            );
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const limit = ReactDOM.findDOMNode(this.refs.limit).value.trim();
        var date = new Date();

        Meteor.call('limits.upsert', limit, date, (err, res) => {
            if (err) {
                this.setState({
                    message: err.reason,
                    bstyle: 'danger',
                });
                console.log(err);
                throw new Meteor.Error('It did not work!')

            } else {
                this.setState({
                    message: 'Limits saved successfully!',
                    bstyle: 'success',
                });
            }
            ReactDOM.findDOMNode(this.refs.limit).value = "";
        });
        setTimeout(function () {
            this.setState({message: ''});
        }.bind(this), 3000);

    }

    render(){
        return (
            <Panel bsStyle="default">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Limit Details</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal className = "useraccountsetup" onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup>
                            {this.renderTask()}
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10} lg={4}>
                                <FormControl type="email" placeholder="Email" defaultValue = {this.state.email} readOnly="readOnly" ></FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalAddress">
                            <Col componentClass={ControlLabel} sm={2}>
                                Transaction Limit
                            </Col>
                            <Col sm={10} lg={4}>
                                <FormControl type="number" placeholder="In USD" ref="limit" required/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit"  bsStyle="danger">Save</Button>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                {this.state.message ? <Alert bsStyle={this.state.bstyle}
                                                             id="alertBox">{this.state.message}</Alert> : undefined}
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('limits');
    return {
        limits: Limits.find({userId: Meteor.userId()}).fetch(),
    };
})(ConfigureLimit);