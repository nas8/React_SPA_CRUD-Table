import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/joy';
import { useState } from 'react';
import { TABLE_DATA_API } from '../../api/table-data';

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

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface Row {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

const initRowState = {
  companySigDate: '',
  companySignatureName: '',
  documentName: '',
  documentStatus: '',
  documentType: '',
  employeeNumber: '',
  employeeSigDate: '',
  employeeSignatureName: '',
};

export const BasicModal: React.FC<ModalProps> = ({ isOpen = false, handleClose }) => {
  const token = localStorage.getItem('token');
  const [postItem, { isLoading, isError }] = TABLE_DATA_API.postTableData.useMutation();

  const [documentStatus, setDocumentStatus] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeDate, setEmployeeDate] = useState('');
  const [companyDate, setCompanyDate] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newRow: Row = { ...initRowState };

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

    const postData = {
      token: token,
      item: { ...newRow },
    };

    console.log(isLoading);

    postItem(postData);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new row
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
              <Button loading={isLoading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
