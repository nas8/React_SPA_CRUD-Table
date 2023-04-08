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
  const [postItem, { isLoading: putLoading }] = TABLE_DATA_API.postTableData.useMutation();
  const [putItem] = TABLE_DATA_API.putTableData.useMutation();

  const [documentStatus, setDocumentStatus] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeDate, setEmployeeDate] = useState('');
  const [companyDate, setCompanyDate] = useState('');

  const [showPostError, setShowPostError] = useState(false);
  const [showPutError, setShowPutError] = useState(false);

  const { postDataStatus, putDataStatus } = useSelector(selectTableData);

  useEffect(() => {
    if (values) {
      setDocumentStatus(values.documentStatus);
      setEmployeeNumber(values.employeeNumber);
      setDocumentType(values.documentType);
      setDocumentName(values.documentName);
      setCompanyName(values.companySignatureName);
      setEmployeeName(values.employeeSignatureName);
      setEmployeeDate(formatDate(values.employeeSigDate));
      setCompanyDate(formatDate(values.companySigDate));
    }
  }, [values]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { id, rowNumber, ...newRow } = initValuesState;

    newRow.documentStatus = documentStatus;
    newRow.employeeNumber = employeeNumber;
    newRow.documentType = documentType;
    newRow.documentName = documentName;
    newRow.companySignatureName = companyName;
    newRow.employeeSignatureName = employeeName;
    if (employeeDate && companyDate) {
      const formattedEmployeeDate = new Date(employeeDate);
      const formattedCompanyDate = new Date(companyDate);

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
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '7px', flexDirection: 'column' }}>
                  <span>Document status:</span>
                  <Input
                    placeholder="Document status"
                    required
                    value={documentStatus}
                    onChange={(e) => setDocumentStatus(e.target.value)}
                  />
                  <span>Employee number:</span>
                  <Input
                    placeholder="Employee number"
                    required
                    value={employeeNumber}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                  />
                  <span>Document type:</span>
                  <Input
                    placeholder="Document type"
                    required
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                  />
                  <span>Document name:</span>
                  <Input
                    placeholder="Document name"
                    required
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: '7px', flexDirection: 'column' }}>
                  <span>Company name:</span>
                  <Input
                    placeholder="Company name"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <span>Employee name:</span>
                  <Input
                    placeholder="Employee name"
                    required
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  />
                  <span>Employee date:</span>
                  <Input
                    type="date"
                    placeholder="Employee date"
                    required
                    value={employeeDate}
                    onChange={(e) => setEmployeeDate(e.target.value)}
                  />
                  <span>Company date:</span>
                  <Input
                    type="date"
                    placeholder="Company date"
                    required
                    value={companyDate}
                    onChange={(e) => setCompanyDate(e.target.value)}
                  />
                </div>
              </div>
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
