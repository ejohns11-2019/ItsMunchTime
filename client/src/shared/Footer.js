import React from 'react';
import {Segment, Container, Grid, Header, List} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import './footer.css';

const Footer = () => (
  <footer>
    <Segment className='inverted vertical footer'>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item as='a'>Sitemap</List.Item>
              <List.Item as='a'>Contact Us</List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Services' />
            <List link inverted>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
            </List>
          </Grid.Column>
         
        </Grid.Row>
      </Grid>
    </Container>
    </Segment>
  </footer> 

)

export default Footer