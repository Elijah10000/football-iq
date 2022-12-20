import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { playersApi } from '../api/players'
import styled from 'styled-components'
import {  DropdownWrapper, StyledSelect, StyledOption, StyledLabel, StyledButton } from 'styles/index'

export function Dropdown(props) {
  return (
    <DropdownWrapper action={props.action}>
      <StyledLabel htmlFor="services">
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="services" name="services">
        {props.children}
      </StyledSelect>
      <StyledButton type="submit" value={props.buttonText} />
    </DropdownWrapper>
  );
}

export function Option(props) {
  return (
    <StyledOption selected={props.selected}>
      {props.value}
    </StyledOption>
  );
}