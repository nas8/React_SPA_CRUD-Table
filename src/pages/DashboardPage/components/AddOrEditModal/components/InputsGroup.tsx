import React from 'react';
import { Input } from '@mui/joy';
import { InputsWrapper, Container } from './InputsGroup.styled';
import { NumberedItem } from '../../../../../store/tableSlice';

interface InputsGroupProps {
  inputsState: NumberedItem;
  setInputsState: (inputsState: NumberedItem) => void;
}

export const InputsGroup: React.FC<InputsGroupProps> = ({ inputsState, setInputsState }) => {
  return (
    <Container>
      <InputsWrapper>
        <span>Document status:</span>
        <Input
          placeholder="Document status"
          required
          value={inputsState.documentStatus}
          onChange={(e) => setInputsState({ ...inputsState, documentStatus: e.target.value })}
        />
        <span>Employee number:</span>
        <Input
          placeholder="Employee number"
          required
          value={inputsState.employeeNumber}
          onChange={(e) => setInputsState({ ...inputsState, employeeNumber: e.target.value })}
        />
        <span>Document type:</span>
        <Input
          placeholder="Document type"
          required
          value={inputsState.documentType}
          onChange={(e) => setInputsState({ ...inputsState, documentType: e.target.value })}
        />
        <span>Document name:</span>
        <Input
          placeholder="Document name"
          required
          value={inputsState.documentName}
          onChange={(e) => setInputsState({ ...inputsState, documentName: e.target.value })}
        />
      </InputsWrapper>
      <InputsWrapper style={{ display: 'flex', gap: '7px', flexDirection: 'column' }}>
        <span>Company name:</span>
        <Input
          placeholder="Company name"
          required
          value={inputsState.companySignatureName}
          onChange={(e) => setInputsState({ ...inputsState, companySignatureName: e.target.value })}
        />
        <span>Employee name:</span>
        <Input
          placeholder="Employee name"
          required
          value={inputsState.employeeSignatureName}
          onChange={(e) =>
            setInputsState({ ...inputsState, employeeSignatureName: e.target.value })
          }
        />
        <span>Employee date:</span>
        <Input
          type="date"
          placeholder="Employee date"
          required
          value={inputsState.employeeSigDate}
          onChange={(e) => setInputsState({ ...inputsState, employeeSigDate: e.target.value })}
        />
        <span>Company date:</span>
        <Input
          type="date"
          placeholder="Company date"
          required
          value={inputsState.companySigDate}
          onChange={(e) => setInputsState({ ...inputsState, companySigDate: e.target.value })}
        />
      </InputsWrapper>
    </Container>
  );
};
