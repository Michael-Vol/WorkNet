import React from 'react';
import './PersonalInfo.scss';
import {
    Sidenav,
    Icon,
    Sidebar,
    PanelGroup,
    Container,
    Panel,
    Col,
    Row,
    Nav,
    Dropdown,
    FlexboxGrid,
    ButtonToolbar,
    Button,
} from 'rsuite';
import PersonalInfoItem from './PersonalInfoItem';
import PersonalInfoSideNav from './PersonalInfoSideNav';
const PersonalInfo = () => {
    return (
        <Container>
            <FlexboxGrid justify='start'>
                <FlexboxGrid.Item colspan={4}>
                    <PersonalInfoSideNav />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={20}>
                    <PanelGroup>
                        <FlexboxGrid justify='space-around'>
                            <Button className='add-item-btn'> Add Experience</Button>

                            <FlexboxGrid.Item id='personalInfo-title' colspan={14}>
                                <h1>Work Experience</h1>
                            </FlexboxGrid.Item>
                            <PersonalInfoItem
                                headerName='header1'
                                text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam quae amet quod unde ipsum perferendis natus iure nostrum cupiditate soluta!
'
                            />
                            <PersonalInfoItem
                                headerName='header1'
                                text='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, magni neque. Optio soluta voluptatum vel itaque omnis atque eaque amet quod veniam accusantium qui temporibus iste voluptatibus ipsam laboriosam recusandae aspernatur, nulla repellat impedit quasi voluptas totam repudiandae inventore ratione? Quisquam animi cum omnis ipsam, excepturi eveniet laborum provident modi.
'
                            />
                            <PersonalInfoItem
                                headerName='header1'
                                text='					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, magni neque. Optio soluta voluptatum vel itaque omnis atque eaque amet quod veniam accusantium qui temporibus iste voluptatibus ipsam laboriosam recusandae aspernatur, nulla repellat impedit quasi voluptas totam repudiandae inventore ratione? Quisquam animi cum omnis ipsam, excepturi eveniet laborum provident modi.
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, magni neque. Optio soluta voluptatum vel itaque omnis atque eaque amet quod veniam accusantium qui temporibus iste voluptatibus ipsam laboriosam recusandae aspernatur, nulla repellat impedit quasi voluptas totam repudiandae inventore ratione? Quisquam animi cum omnis ipsam, excepturi eveniet laborum provident modi.	'
                            />
                        </FlexboxGrid>
                    </PanelGroup>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Container>
    );
};

export default PersonalInfo;
