import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Button = styled.button`
    padding: 8px 16px;
    border-width: 0;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    color: white;
    background-color: orange;
    margin-bottom: 10px;
`

export const Details = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    gap: 10px;
`
export const Description = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Additional = styled.div`
    padding-top: 10px;
    border-bottom: 1px solid black;
`
export const Item = styled(Link)`
    text-decoration: none;
    color: black;

    &:hover {
        color: orange;
    }
`