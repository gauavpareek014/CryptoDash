import React from "react";
import { Button,Jumbotron,Grid,Row,Col,Panel,Thumbnail,Label} from 'react-bootstrap';


export default class BuySellPayment extends React.Component{
    render(){
        return (
            <div className="buySellPayment">
                <Grid>
                    <Row>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/Bitcoin-icon.png" alt="20x20">

                            </Thumbnail>
                        </Col>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/etherium-icon.png" alt="20x20">
                            </Thumbnail>
                        </Col>
                        <Col xs={4} md={4}>
                            <Thumbnail src="/images/litecoin-icon.png" alt="20x20">
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
