import React, { useEffect, useState, useContext } from 'react';
import { Document, Page } from 'react-pdf';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import AuthContext from '../../../config/authContext';

const Applications = () => {
  const { token} = useContext(AuthContext);  
  const [applications, setApplications] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/application/all',config);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'cv',
      headerName: 'CV',
      width: 200,
      renderCell: (params) => (
        <Document
          file={`data:application/pdf;base64,${params.value}`}
          onLoadSuccess={({ numPages }) => console.log(`Number of pages: ${numPages}`)}
        >
          <Page pageNumber={1} />
        </Document>
      ),
    },
    {
      field: 'motivation_letter',
      headerName: 'Motivation Letter',
      width: 200,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          View Motivation Letter
        </a>
      ),
    },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'submission_date', headerName: 'Submission Date', width: 150 },
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'offre_stage_id', headerName: 'Offer Stage ID', width: 140 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid columns={columns} rows={applications} />
    </div>
  );
};

export default Applications;
