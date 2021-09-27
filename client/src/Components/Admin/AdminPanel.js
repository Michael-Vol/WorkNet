import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, FlexboxGrid, Table } from 'rsuite';
import './AdminPanel.scss';
const AdminPanel = () => {
	return (
		<FlexboxGrid className='admin--flex--panel--container'>
			<FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={20} className='admin--panel--container'>
				<Row className='panel--header--container'>
					<span>Administrator Panel</span>
				</Row>
				<Row className='header--divider'></Row>
				<Row className='table--container'>
					<Table hover height={620}>
						<Table.Column>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.Cell>fdsfads</Table.Cell>
						</Table.Column>
						<Table.Column>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.Cell>afdssd</Table.Cell>
						</Table.Column>
						<Table.Column>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.Cell>afdssd</Table.Cell>
						</Table.Column>
						<Table.Column>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.Cell>afdssd</Table.Cell>
						</Table.Column>
					</Table>
				</Row>
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default AdminPanel;
