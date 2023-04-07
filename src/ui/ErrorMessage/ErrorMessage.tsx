import React from 'react';
import { ErrorWrapper } from './ErrorMessage.styled';

interface ErrorMessageProps {
  message: string;
  time?: number;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorWrapper>{message}</ErrorWrapper>;
};
