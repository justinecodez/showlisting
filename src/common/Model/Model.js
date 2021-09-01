import React, { useState } from 'react'
import Modal from 'react-modal'
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './Model.css'

const styles = {
    tabpanel: {
        width: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    input: {
        width: "80%",
        margin: "10px auto"
    }
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return <div {...other}>{value === index ? <div p={3}>{children}</div> : null}</div>;
}

const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

Modal.setAppElement("#root")
function LoginRegisterModel({ showModal, openModal, classes }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={() => { openModal() }}
            className="model"
        >
            <div>
                <AppBar position="static" color="default">
                    <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <FormControl className={classes.tabpanel}>
                        <TextField
                            label="Username"
                            variant="filled"
                            className={classes.input}
                            inputProps={{ style: inputStyle }}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="filled"
                            type="password"
                            className={classes.input}
                            required
                            inputProps={{ style: inputStyle }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.input}
                        >
                            Login
                        </Button>
                    </FormControl>
                </TabPanel>
                <TabPanel value={value} index={1}>

                    {/* If information is not entered in these fields, 
                    then the error message ‘required’ should be displayed. 
                   */}

                    <FormControl className={classes.tabpanel}>
                        <TextField
                            label="First Name"
                            variant="filled"
                            className={classes.input}
                            inputProps={{ style: inputStyle }}
                            required
                        />
                        <TextField
                            label="Last Name"
                            variant="filled"
                            className={classes.input}
                            inputProps={{ style: inputStyle }}
                            required
                        />
                        <TextField
                            label="Email"
                            variant="filled"
                            className={classes.input}
                            inputProps={{ style: inputStyle }}
                            type="email"
                            required
                        />
                        <TextField
                            label="Password"
                            variant="filled"
                            type="password"
                            className={classes.input}
                            inputProps={{ style: inputStyle }}
                            required
                        />
                        <TextField
                            label="Contact No"
                            variant="filled"
                            type="email"
                            className={classes.input}
                            inputProps={{ style: inputStyle }}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.input}
                        >
                            Register
                        </Button>
                    </FormControl>
                </TabPanel>
            </div>
        </Modal>
    );
}

LoginRegisterModel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginRegisterModel);