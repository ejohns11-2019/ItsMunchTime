import React from 'react';
import {Segment, Container, Grid, Header, List} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';


const Footer = () => (

  <footer style={{ padding: '5em 0em', backgroundColor: '#6fe3ff' }}> 
    <Segment vertical>
    <Container>
      <Grid divided stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Link to='/about'>
            <Header as='h4' content='About' />
              <List link>
                <Link to='/contact'>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'></List.Item>
                </Link>
              </List>
            </Link>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as='h4' content='' />
            <List link>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4'>
              ItsMunchTime!
            </Header>
            <p>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    </Segment>
  </footer>

)

export default Footer;
