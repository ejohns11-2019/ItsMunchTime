import React from 'react';
import { Header } from 'semantic-ui-react';
import Image from '../../images/Screen Shot 2019-04-23 at 6.29.27 PM.png'
import './About.css';

const About = () => (
  <>
  <br/>
  <div class="ui centered middle aligned two column grid">
    <div className="column">
      <Header as='h1' class="header">Munch Time</Header>
      <p class="paragraph">This is the app you didn't know you desperately needed when ordering lunch for a group.</p>
      <p class="paragraph">With Munch Time you can easily collect lunch orders for that pesky office meeting. </p>
      <p class="paragraph">You set the restaurant and lunch date, and each employee chooses what they want to eat.</p>
    </div>
    <div class="column"><center><img src={Image} alt='Logo' class="ui image" width="300px" /></center>
    </div>
  </div>
</>
)


export default About;
