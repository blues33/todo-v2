import React from 'react';
import styled from 'styled-components';

import { media } from '../_helpers/mediaQuerriesBreakpoints';
import colors from '../_helpers/colors';

import internet from '../assets/img/internet.svg';
import photocamera from '../assets/img/photo-camera.svg';
import clock from '../assets/img/clock.svg';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.tablet`
    width: 90%;
 `};

  ${media.laptop`
      width: 80%;
  `};
`;

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 5rem 0;
  & > h4 {
    color: black;
    background-color: ${colors.white};
    text-transform: uppercase;
    padding: 1rem;
    font-size: 1.5rem;
    ${media.tablet`
      font-size: 2rem;
    `};
  }

  & > h1 {
    border: 10px solid ${colors.blue};
    text-transform: uppercase;
    padding: 1rem 2rem;
    color: #fff;
    font-size: 2rem;
    ${media.tablet`
      font-size: 3rem;
    `};
  }

  & > p {
    margin-top: 15px;
    max-width: 500px;
    color: ${colors.white};
  }
`;

const Thirds = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  ${media.tablet`
    flex-direction: row;
  `};
`;

const ThirdsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${colors.white};
  padding: 1rem;

  & > img {
    width: 75px;
  }

  & > h5 {
    font-size: 2rem;
  }

  & > p {
    margin-top: 1rem;
  }
`;

export default function About() {
  return (
    <Container>
      <Landing>
        <h4>we're</h4>
        <h1>Another Landing Page</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit aliquid dolor nam
          inventore explicabo minus perferendis eos. Saepe asperiores iure nostrum, nulla
          praesentium cupiditate. Asperiores, sapiente optio? Quo, magni!
        </p>
      </Landing>
      <Thirds>
        <ThirdsItem>
          <img src={internet} alt="img1" />
          <h5>Veni</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta amet illum labore
            reprehenderit assumenda. Ad tenetur sed doloribus placeat blanditiis quasi temporibus
            fugiat, veritatis sit labore architecto fuga quidem ab.
          </p>
        </ThirdsItem>
        <ThirdsItem>
          <img src={photocamera} alt="img2" />
          <h5>Vedi</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta amet illum labore
            reprehenderit assumenda. Ad tenetur sed doloribus placeat blanditiis quasi temporibus
            fugiat, veritatis sit labore architecto fuga quidem ab.
          </p>
        </ThirdsItem>
        <ThirdsItem>
          <img src={clock} alt="img3" />
          <h5>Vici</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta amet illum labore
            reprehenderit assumenda. Ad tenetur sed doloribus placeat blanditiis quasi temporibus
            fugiat, veritatis sit labore architecto fuga quidem ab.
          </p>
        </ThirdsItem>
      </Thirds>
    </Container>
  );
}
