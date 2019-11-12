import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Select from "react-select";

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
                <Button color="primary" onClick={toggle}>View</Button>
                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{header}</ModalHeader>
                    <ModalBody>
                        {this.state.body}
                    </ModalBody>
                    <ModalFooter>
                        <Select className="selectContainerModal"
                                options={[{value: 'Pass', label: 'Pass'}, {value: 'Fail', label: 'Fail'}]}
                        />
                        <Button color="success">Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }


}

export default ModalExample
