// This component handles the App template used on every page

import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { SideNav } from 'react-sidenav';
import { browserHistory } from 'react-router';
var Layout = require('react-layout')
import { Navbar, NavItem, NavDropdown, Nav, MenuItem, Image } from 'react-bootstrap';
import imglogo from '../.././images/actiderm-logo.png'

class HomeLayout extends React.Component {


  constructor(props, context) {
    super(props , context);
    this.state = {
      selected: 'dashboard',
      sidebarWidth: 300
    };
    this.onSelection = this.onSelection.bind(this);

  }
  onSelection(selection) {
    this.setState({selected: selection.id});
    browserHistory.push(`/${selection.id}`);
    //or trigger a dispatch here
  }

  render() {
    let navi = [
      { id: 'admin', icon: 'fa fa-dashboard' , text: 'Dashboard'},
      { id: 'manageCategory1', icon: 'fa fa-cube', text: 'Category' ,
        navlist: [
          { icon: 'fa fa-desktop', id: 'admin/category' ,text: 'Manage Category' },
        ]
      },
      { id: 'products', icon: 'fa fa-cube', text: 'Products' ,
        navlist: [
          { icon: 'fa fa-desktop', id: 'admin/product' ,text: 'Manage Product' },
        ]
      },
      { id: 'inventory', icon: 'fa fa-database' ,text: 'Inventory'},
      { id: 'deliveries', icon: 'fa fa-truck' ,text: 'Deliveries'},
      { id: 'reports', icon: 'fa fa-bar-chart' ,text: 'Reports' }
    ];
    return (

    <Layout layoutWidth={window.innerWidth} layoutHeight={window.innerHeight}>
      <Layout className="nav" layoutHeight={50}>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>

              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavDropdown eventKey={1} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={1.1}>Logout</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Layout>
      <Layout layoutHeight='flex'>

        <Layout className="main main-layout" layoutWidth="flex">
          {this.props.children}
        </Layout>
        <Layout className="sidebar sidebarBackground" layoutWidth={this.state.sidebarWidth}>
          <SideNav selected={this.state.selected} navs={navi} onSelection={this.onSelection}  />
        </Layout>

      </Layout>
    </Layout>
    );
  }
}

HomeLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default HomeLayout;
