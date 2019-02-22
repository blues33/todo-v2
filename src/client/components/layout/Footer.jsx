import React from 'react';
import styled from 'styled-components';
import colors from '../../_helpers/colors';

const FooterBox = styled.footer`
  display: flex;
  justify-content: center;
  background-color: ${colors.green};

  & > p {
    padding: 1rem;
    color: #f5f5f5;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`;

export default function Footer() {
  return (
    <FooterBox>
      <p>copyright © serik bukenov 2018</p>
    </FooterBox>
  );
}
