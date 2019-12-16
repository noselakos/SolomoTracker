import * as React from "react";
import * as ReactDOM from "react-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Icon, Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Client from '../Utils/HttpClient'
import { StyledTableCell, StyledButton, StyledTextField, StyledPaper } from './StyledComponents'
import { IGeolocationRecord, HeadCell, IGeolocationState } from './Interfaces';
import Overlay from './Overlay'

class GeolocationComponent extends React.Component<{}, IGeolocationState>{
    httpClient: Client;

    constructor(props: any){
        super(props);
        this.httpClient = new Client();
        this.state = {
            geolocationData: [],
            geolocationSearchInput: '',
            isProcessing: false
        }

        this.handleSearchGeolocationInputChange = this.handleSearchGeolocationInputChange.bind(this);
        this.handleGetGeolocationClick = this.handleGetGeolocationClick.bind(this);
        this.handleDeleteGeolocationClick = this.handleDeleteGeolocationClick.bind(this);
    }

    getGeolocationData(): void {
        this.setState({isProcessing: true});
        const url = "api/geolocation/GetGeolocationData"
        this.httpClient.get(url, {}, (response: any) => {
            this.setState({
                geolocationData: response.data,
                isProcessing: false
            })
        }, (error: any) => {
            toast.error(error.response.data.message);
            this.setState({isProcessing: false});
        });
    }

    handleSearchGeolocationInputChange(e: any): void {
        this.setState({ geolocationSearchInput: e.target.value });
    }

    handleGetGeolocationClick(): void {
        if (this.state.geolocationSearchInput === null || this.state.geolocationSearchInput === ''){
            return;
        }
        this.setState({ 
            isProcessing: true, 
            geolocationSearchInput: '' 
        });
        const url = "api/geolocation/InsertGeolocationFromApi";
        this.httpClient.post(url, { ipUrlQuery: this.state.geolocationSearchInput }, (response: any) => {
            this.setState({
                geolocationData: [response.data, ...this.state.geolocationData], 
                isProcessing: false
            });
        }, (error: any) => {
            toast.error(error.response.data.message);
            this.setState({isProcessing: false});
        });
    }

    handleDeleteGeolocationClick(geolocationId: number): void {
        this.setState({isProcessing: true});
        const url = "api/geolocation/DeleteGeolocation";
        this.httpClient.post(url, { geolocationId: geolocationId }, (response: any) => {
            this.setState({
                geolocationData: this.state.geolocationData.filter((item: IGeolocationRecord) => item.geolocationId !== geolocationId ),
                isProcessing: false
            });
        }, (error: any) => {
            toast.error(error.response.data.message);
            this.setState({isProcessing: false});
        });
    }

    componentDidMount(): void {
        this.getGeolocationData();
    }

    render(){
        const headCells: HeadCell[] = [
            { id: 'IP', numeric: false, disablePadding: true, label: 'IP' },
            { id: 'Type', numeric: false, disablePadding: false, label: 'Type' },
            { id: 'ContinentCode', numeric: false, disablePadding: false, label: 'Continent Code' },
            { id: 'ContinentName', numeric: false, disablePadding: false, label: 'Continent Name' },
            { id: 'CountryCode', numeric: false, disablePadding: false, label: 'Country Code' },
            { id: 'CountryName', numeric: false, disablePadding: false, label: 'Country Name' },
            { id: 'RegionCode', numeric: false, disablePadding: false, label: 'Region Code' },
            { id: 'RegionName', numeric: false, disablePadding: false, label: 'Region Name' },
            { id: 'City', numeric: false, disablePadding: false, label: 'City' },
            { id: 'Zip', numeric: false, disablePadding: false, label: 'Zip' },
            { id: 'Latitude', numeric: true, disablePadding: false, label: 'Latitude' },
            { id: 'Longitude', numeric: true, disablePadding: false, label: 'Longitude' },
        ];

        const paperContainerStyle = {
            paddingBottom: 30
        };

        const logoImageStyle = {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
            marginBottom: '25px'
        };

        return (
            <div style={{position: 'relative'}}>
                <Overlay isActive={this.state.isProcessing}/>
                <div style={paperContainerStyle}>
                    <StyledPaper>
                        <Grid container>
                            <Grid item sm={12} spacing={3}>
                            <Icon>
                                <img src="/Content/logo.svg" style={logoImageStyle}/>
                            </Icon>
                            </Grid>
                            <Grid item sm={4} spacing={3}></Grid>
                            <Grid item sm={4} spacing={3}>
                                <StyledTextField 
                                label="Enter IP or URL" 
                                variant="standard"
                                fullWidth
                                inputProps={{
                                    style: {fontSize: 15} 
                                }}
                                InputLabelProps={{
                                    style: {fontSize: 15} 
                                }}
                                value={this.state.geolocationSearchInput}
                                onChange={this.handleSearchGeolocationInputChange}/>
                            </Grid>
                            <Grid item sm={4} spacing={3}></Grid>
                            <Grid item sm={4} spacing={3}></Grid>
                            <Grid item sm={4} spacing={3}>
                                <StyledButton size="large" variant="contained" color="primary" onClick={this.handleGetGeolocationClick}>Get Geolocation!</StyledButton>
                            </Grid>
                            <Grid item sm={4} spacing={10}></Grid>
                        </Grid>
                    </StyledPaper>
                </div>

                <div style={paperContainerStyle}>
                <StyledPaper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                </StyledTableCell>
                                {headCells.map(headCell => (
                                    <StyledTableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'default'}
                                        >
                                        {headCell.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.geolocationData
                            .map((row: IGeolocationRecord) => {
                            const labelId = `enhanced-table-checkbox-${row.geolocationId}`;
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.name}
                                    >
                                    <StyledTableCell>
                                        <IconButton aria-label="delete" onClick={() => { this.handleDeleteGeolocationClick(row.geolocationId) }}>
                                            <DeleteIcon></DeleteIcon>
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" id={labelId} scope="row" padding="none">
                                        {row.ip}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.type}</StyledTableCell>
                                    <StyledTableCell>{row.continentCode}</StyledTableCell>
                                    <StyledTableCell>{row.continentName}</StyledTableCell>
                                    <StyledTableCell>{row.countryCode}</StyledTableCell>
                                    <StyledTableCell>{row.countryName}</StyledTableCell>
                                    <StyledTableCell>{row.regionCode}</StyledTableCell>
                                    <StyledTableCell>{row.regionName}</StyledTableCell>
                                    <StyledTableCell>{row.city}</StyledTableCell>
                                    <StyledTableCell>{row.zip}</StyledTableCell>
                                    <StyledTableCell>{row.latitude.toFixed(5)}</StyledTableCell>
                                    <StyledTableCell>{row.longitude.toFixed(5)}</StyledTableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </StyledPaper>
                </div>
                <ToastContainer />
            </div>

        )
    }
}

ReactDOM.render(<GeolocationComponent />, document.getElementById('react-body'));