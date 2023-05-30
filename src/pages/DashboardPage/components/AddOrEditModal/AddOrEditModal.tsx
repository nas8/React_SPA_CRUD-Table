import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Modal } from '@mui/material';
import { Button } from '@mui/joy';
import { TABLE_DATA_API } from '../../../../api/table-data';
import { formatDate } from '../../../../utils/formatDate';
import { selectTableData, NumberedItem } from '../../../../store/tableSlice';
import { RequestStatus } from '../../../../types/requestStatuses';
import { ErrorMessage } from '../../../../ui/ErrorMessage/ErrorMessage';
import { InputsGroup } from './components/InputsGroup';
import { ContentWrapper, StyledForm } from './AddOrEditModal.styled';

interface AddOrEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  mode: ModalMode;
  values?: NumberedItem;
}

const initValuesState = {
  companySigDate: '',
  companySignatureName: '',
  documentName: '',
  documentStatus: '',
  documentType: '',
  employeeNumber: '',
  employeeSigDate: '',
  employeeSignatureName: '',
  id: '',
  rowNumber: 0,
};

export enum ModalMode {
  edit = 'edit',
  add = 'add',
}

export const AddOrEditModal: React.FC<AddOrEditModalProps> = ({
  isOpen = false,
  handleClose,
  mode,
  values = initValuesState,
}) => {
  const token = localStorage.getItem('token');
  const [postItem] = TABLE_DATA_API.postTableData.useMutation();
  const [putItem] = TABLE_DATA_API.putTableData.useMutation();

  const [inputsState, setInputsState] = useState<NumberedItem>(values);
  const [showPostError, setShowPostError] = useState(false);
  const [showPutError, setShowPutError] = useState(false);

  const { postDataStatus, putDataStatus } = useSelector(selectTableData);

  useEffect(() => {
    if (values) {
      setInputsState({
        ...values,
        employeeSigDate: formatDate(values.employeeSigDate),
        companySigDate: formatDate(values.companySigDate),
      });
    }
  }, [values]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, rowNumber, ...newRow } = inputsState;

    if (mode === ModalMode.add) {
      const postData = {
        token: token,
        item: {
          ...newRow,
          employeeSigDate: new Date(inputsState.employeeSigDate).toISOString(),
          companySigDate: new Date(inputsState.employeeSigDate).toISOString(),
        },
      };

      const response = await postItem(postData);

      if ('data' in response) {
        closeModal();
        setInputsState(initValuesState);
        return;
      }

      setShowPostError(true);
    }

    if (mode === ModalMode.edit) {
      const putData = {
        token: token,
        item: { ...newRow },
        id: values.id,
      };

      const response = await putItem(putData);

      if ('data' in response) {
        closeModal();
        return;
      }

      setShowPutError(true);
    }
  };

  const closeModal = () => {
    setShowPostError(false);
    setShowPutError(false);
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <StyledForm onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {mode === ModalMode.add ? 'Add new row' : `Edit row №${values.rowNumber}`}
        </Typography>
        <ContentWrapper>
          <InputsGroup inputsState={inputsState} setInputsState={setInputsState}></InputsGroup>
          <Button
            loading={
              postDataStatus === RequestStatus.LOADING || putDataStatus === RequestStatus.LOADING
            }
            type="submit">
            {mode === ModalMode.add ? 'Add' : 'Edit'}
          </Button>
          {showPostError && <ErrorMessage message="Failed to add new row, server error :(" />}
          {showPutError && <ErrorMessage message="Failed to update row, server error :(" />}
        </ContentWrapper>
      </StyledForm>
    </Modal>
  );
};
