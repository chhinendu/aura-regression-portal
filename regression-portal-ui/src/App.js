import React, {Component} from 'react';
import _ from 'lodash';
import {Button, Col, Container, Row, Spinner, Table} from 'reactstrap';
import Select from 'react-select';
import {ResponsivePie} from '@nivo/pie';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import {data} from './data.js';
import ModalExample from './modal.js'


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
        fetch(`http://pu-nb-cpaul.na.rtdom.net:8080/regression-api/?module=${module.value}&date=${date.value}`).then(res => res.json())
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

    getChartData(filterData) {
        const defaultData = _.cloneDeep(data);

        _.forEach(filterData, (value, key) => {
            const selectedValue = defaultData.find((data) => data.id === value.locale);
            if (selectedValue) {
                selectedValue.value++;
            }
        });
        return defaultData;
    }

    render() {
        let count = 0;
        let testMap = {};
        _.forEach(this.state.tableData, (value) => {
            if (testMap[value.testCaseClass]) {
                if (!_.includes(testMap[value.testCaseClass], value.continent)) {
                    testMap[value.testCaseClass].push(value.continent);
                }
            }
            else {
                testMap[value.testCaseClass] = [];
                testMap[value.testCaseClass].push(value.continent);
            }
        });
        let records = this.state.tableData.map(function (row) {
            count += 1;
            return (
                <tr>
                    <th scope="row">{count}</th>
                    <td>{row.testCaseClass}</td>
                    <td>{testMap[row.testCaseClass].join(', ')}</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><ModalExample data={row}/></td>
                </tr>
            );
        });
        let data = this.getChartData(this.state.tableData);
        return (
            <div>
                <header className="app-header">
                    Regression portal
                </header>
                <Container fluid={true}>
                    <Row style={{height: 400}}>
                        <Col className="chart-container">
                        <ResponsivePie
                            data={data}
                            margin={{
                                "top": 40,
                                "right": 80,
                                "bottom": 80,
                                "left": 80
                            }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            colors="nivo"
                            colorBy={data => data.color}
                            borderWidth={1}
                            borderColor="inherit:darker(0.2)"
                            radialLabel={data => `${data.label} failures`}
                            radialLabelsSkipAngle={10}
                            radialLabelsTextXOffset={6}
                            radialLabelsTextColor="#333333"
                            radialLabelsLinkOffset={0}
                            radialLabelsLinkDiagonalLength={16}
                            radialLabelsLinkHorizontalLength={24}
                            radialLabelsLinkStrokeWidth={1}
                            radialLabelsLinkColor="inherit"
                            sliceLabel={data => data.value}
                            slicesLabelsSkipAngle={10}
                            slicesLabelsTextColor="#333333"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            theme={{
                                "tooltip": {
                                    "container": {
                                        "fontSize": "13px"
                                    }
                                },
                                "labels": {
                                    "textColor": "#555"
                                }
                            }}
                            defs={[
                                {
                                    "id": "dots",
                                    "type": "patternDots",
                                    "background": "inherit",
                                    "color": "rgba(255, 255, 255, 0.3)",
                                    "size": 4,
                                    "padding": 1,
                                    "stagger": true
                                },
                                {
                                    "id": "lines",
                                    "type": "patternLines",
                                    "background": "inherit",
                                    "color": "rgba(255, 255, 255, 0.3)",
                                    "rotation": -45,
                                    "lineWidth": 6,
                                    "spacing": 10
                                },
                                {
                                    "id": "squares",
                                    "type": "patternSquares",
                                    "background": "inherit",
                                    "color": "rgba(255, 255, 255, 0.3)",
                                    "rotation": -45,
                                    "lineWidth": 6,
                                    "spacing": 10
                                }
                            ]}
                            fill={[]}
                            legends={[]}
                        />
                        </Col>
                        <Col className="filter-container">
                            <Row>
                                <Select className="selectContainer"
                                    value={this.state.selectedModule}
                                    onChange={this.handleModuleChange}
                                    options={this.state.moduleOptions}
                                /></Row>
                            <Row><Select className="selectContainer"
                                value={this.state.selectedExecutionDate}
                                onChange={this.handleExceutionDateChange}
                                options={this.state.executionDates}
                            /></Row>
                            <Row><Button className="filter-btn" color="warning" onClick={() => this.getRecords(this.state.selectedModule, this.state.selectedExecutionDate)}> Go </Button></Row>
                        </Col>
                    </Row>
                    <Row className="table-container">
                        <Table striped>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Test Case Name</th>
                                <th>Continent</th>
                                <th>Execution Status</th>
                                <th>Assigned to</th>
                                <th>View</th>
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
