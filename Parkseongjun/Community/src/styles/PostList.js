import { Link } from "react-router-dom";
import styled from "styled-components";

export const Title = styled.h2`
  margin: 0 0 12px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
`;

export const Card = styled.li`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 12px;
`;

export const CardLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: block;
`;

export const CardTitle = styled.strong`
  font-size: 18px;
`;

export const CardExcerpt = styled.p`
  margin: 6px 0 0;
  color: #666;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &.edit {
    color: #007bff;
    border-color: #007bff;
    
    &:hover {
      background: #007bff;
      color: white;
    }
  }

  &.delete {
    color: #dc3545;
    border-color: #dc3545;
    
    &:hover {
      background: #dc3545;
      color: white;
    }
  }
`;