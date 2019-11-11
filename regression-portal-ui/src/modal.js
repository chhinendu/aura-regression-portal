import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

class ModalExample extends Component {

    state = {
        modal: false,
        body: ''
    }

    render() {
        let data = this.props.data;
        let header = data.testCaseClass;
        let body = '';

        const toggle = () => {
            if (!this.state.modal) {
                fetch(`http://pu-nb-cpaul.na.rtdom.net:8080/regression-api/detail?module=${data.module}&date=${data.executionDate}&testCase=${data.testCaseClass}`)
                    .then(res => res.json())
                    .then(response => {
                        this.setState({body: response.failureReason})
                        this.setState({modal: !this.state.modal})
                    })
            }
            else {
                this.setState({modal: !this.state.modal})
            }

        };


        return (
            <div>
                <Button color="danger" onClick={toggle}>View</Button>
                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{header}</ModalHeader>
                    <ModalBody>
                        {this.state.body}
                    </ModalBody>
                </Modal>
            </div>
        )
    }


}

export default ModalExample
