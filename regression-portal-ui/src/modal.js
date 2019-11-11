import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

class ModalExample extends Component {


    render() {
        const modal = false, setModal = false;
        let data = this.props.data;
        let header = data.testCaseClass;
        let body = '';

        const toggle = () => {
            if (!modal) {
                fetch(`http://pu-nb-cpaul.na.rtdom.net:8080/regression-api/detail?module=${data.module}&date=${data.executionDate}&testCase=${data.testCaseClass}`)
                    .then(res => res.json())
                    .then(response => {
                        body = response.failureReason;
                        setModal(!modal);
                    })
            }
            else {
                setModal(!modal);
            }

        };


        return (
            <div>
                <Button color="danger" onClick={toggle}>View</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{header}</ModalHeader>
                    <ModalBody>
                        {body}
                    </ModalBody>
                </Modal>
            </div>
        )
    }


}

export default ModalExample
