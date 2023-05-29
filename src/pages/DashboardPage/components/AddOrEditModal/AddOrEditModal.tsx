import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/joy';
import { useEffect, useState } from 'react';
import { TABLE_DATA_API } from '../../../../api/table-data';
import { formatDate } from '../../../../utils/formatDate';
import { useSelector } from 'react-redux';
import { selectTableData } from '../../../../store/tableSlice';
import { RequestStatus } from '../../../../types/requestStatuses';
import { ErrorMessage } from '../../../../ui/ErrorMessage/ErrorMessage';
import { NumberedItem } from '../../../../store/tableSlice';
import { InputsGroup } from './components/InputsGroup';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

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

  const [inputsState, setInputsState] = useState<NumberedItem>(initValuesState);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { id, rowNumber, ...newRow } = initValuesState;

    newRow.documentStatus = inputsState.documentStatus;
    newRow.employeeNumber = inputsState.employeeNumber;
    newRow.documentType = inputsState.documentType;
    newRow.documentName = inputsState.documentName;
    newRow.companySignatureName = inputsState.companySignatureName;
    newRow.employeeSignatureName = inputsState.employeeSignatureName;
    if (inputsState.employeeSigDate && inputsState.companySigDate) {
      const formattedEmployeeDate = new Date(inputsState.employeeSigDate);
      const formattedCompanyDate = new Date(inputsState.companySigDate);

      newRow.employeeSigDate = formattedEmployeeDate.toISOString();
      newRow.companySigDate = formattedCompanyDate.toISOString();
    }

    if (mode === ModalMode.add) {
      const postData = {
        token: token,
        item: { ...newRow },
      };

      const response: any = await postItem(postData);

      if (response.data) {
        closeModal();
        setInputsState(initValuesState);
      }

      if (response.error) {
        setShowPostError(true);
      }
    }

    if (mode === ModalMode.edit) {
      const putData = {
        token: token,
        item: { ...newRow },
        id: values.id,
      };

      const response: any = await putItem(putData);

      if (response.data) {
        closeModal();
      }

      if (response.error) {
        setShowPutError(true);
      }
    }
  };

  const closeModal = () => {
    setShowPostError(false);
    setShowPutError(false);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {mode === ModalMode.add ? 'Add new row' : `Edit row №${values.rowNumber}`}
            </Typography>
            <div
              style={{ display: 'flex', gap: '30px', flexDirection: 'column', fontSize: '14px' }}>
              <InputsGroup inputsState={inputsState} setInputsState={setInputsState}></InputsGroup>
              <Button
                loading={
                  postDataStatus === RequestStatus.LOADING ||
                  putDataStatus === RequestStatus.LOADING
                }
                type="submit">
                {mode === ModalMode.add ? 'Add' : 'Edit'}
              </Button>
              {showPostError && <ErrorMessage message="Failed to add new row, server error :(" />}
              {showPutError && <ErrorMessage message="Failed to update row, server error :(" />}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
