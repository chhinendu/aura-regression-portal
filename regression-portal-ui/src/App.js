import React, {Component} from 'react';
import _ from 'lodash';
import {Container, Row, Col, Table, Button, Spinner} from 'reactstrap';
import Select from 'react-select';
import {ResponsiveBar} from '@nivo/bar';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';


class App extends Component {

    state = {
        tableData: [],
        filterMasterData: [],
        moduleOptions: [],
        selectedModule: null,
        executionDates: [],
        selectedExecutionDate: null,
        showSpinner: false
    };

    handleModuleChange = selectedOption => {
        this.setState({selectedModule: selectedOption});
        let executionDates = selectedOption.executionDates.map(function (row) {
            return {value: row, label: row}
        });
        this.setState({executionDates: executionDates});
        this.setState({selectedExecutionDate: executionDates[0]});

    };

    handleExceutionDateChange = selectedOption => {
        this.setState({selectedExecutionDate: selectedOption});
    };

    componentDidMount() {
        this.getMasterData();
    }

    getRecords(module, date) {
        this.setState({showSpinner: true});
        let requestParams = {
            module: module.value,
            exceutionDate: date.value
        };
        fetch('http://pu-nb-cpaul.na.rtdom.net:8080/regression-api/', {
            method: 'POST',
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify(requestParams)
        }).then(res => res.json())
            .then(data => {
                this.setState({tableData: data});
                this.setState({showSpinner: false});
            });
    }

    getMasterData() {
        this.setState({showSpinner: true});
        fetch('http://pu-nb-cpaul.na.rtdom.net:8080/regression-api/regressions').then(res => res.json())
            .then(data => {
                data = _.chain(data).groupBy("module").map(function (v, i) {
                    return {
                        module: i,
                        executionDates: _.map(v, 'executionDate')
                    }
                }).value();
                this.setState({filterMasterData: data});
                const moduleOptions = this.state.filterMasterData.map(function (row) {
                    return {
                        module: row.module,
                        value: row.module,
                        label: row.module,
                        executionDates: row.executionDates
                    }
                });
                this.setState({moduleOptions: moduleOptions});
                this.setState({selectedModule: moduleOptions[0]});
                this.handleModuleChange(moduleOptions[0]);
                this.setState({showSpinner: false});
            });
    }

    render() {
        let count = 0;
        let records = this.state.tableData.map(function (row) {
            count += 1;
            return (
                <tr>
                    <th scope="row">{count}</th>
                    <td>{row.testCaseClass}</td>
                    <td>{row.testCaseMethod}</td>
                    <td>{row.continent}</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            );
        });
        return (
            <div>
                <header className="app-header">
                    Regression portal
                </header>
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Select
                                value={this.state.selectedModule}
                                onChange={this.handleModuleChange}
                                options={this.state.moduleOptions}
                            /></Col>
                        <Col><Select
                            value={this.state.selectedExecutionDate}
                            onChange={this.handleExceutionDateChange}
                            options={this.state.executionDates}
                        /></Col>
                        <Col><Button color="warning" onClick={() => this.getRecords(this.state.selectedModule, this.state.selectedExecutionDate)}>Filter</Button></Col>
                    </Row>
                    <hr/>
                    <Row className="table-container">
                        <Table striped>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Test Case Name</th>
                                <th>Method Name</th>
                                <th>Continent</th>
                                <th>Execution Status</th>
                                <th>Assigned to</th>
                                <th>Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                            {records}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
                { this.state.showSpinner ? <Spinner className="loading" color="success" /> : null }
            </div>
        )
    };
}

export default App;
