import React from 'react';
import {Segment, Container, Grid, Header, List} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import './footer.css';

const Footer = () => (

  <footer>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Link to='/about'>
            <Header inverted as='h4' content='About' />
              <List link inverted>
                <Link to='/contact'>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'></List.Item>
                </Link>
              </List>
            </Link>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='' />
            <List link inverted>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
              <List.Item as='a'></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>
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

export default Footer
