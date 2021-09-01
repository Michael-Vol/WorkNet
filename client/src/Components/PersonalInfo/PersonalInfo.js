import React from 'react';
import './PersonalInfo.scss';
import { Sidenav, Nav, Dropdown } from 'rsuite';

const PersonalInfo = () => {
    return (
        <Sidenav activeKey='1' className='sidenav--container'>
            <Sidenav.Body>
                <Nav>
                    <Dropdown placement='leftStart' eventKey='1' title='Personal Info'>
                        <Dropdown.Item>Work Experience</Dropdown.Item>
                        <Dropdown.Item>Education</Dropdown.Item>
                        <Dropdown.Item>Skills</Dropdown.Item>
                    </Dropdown>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    );
};

export default PersonalInfo;
