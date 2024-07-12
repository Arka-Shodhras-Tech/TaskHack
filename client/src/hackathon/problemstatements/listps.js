import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Tooltip,
  useToast,
  TableContainer,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import all exports from 'xlsx'
import './ps.css';
import { HackathonNav } from '../hackathonnav/hackathonnav';
import GridOnIcon from '@mui/icons-material/GridOn';
import ShareIcon from '@mui/icons-material/Share'; // Import ShareIcon
import HomeIcon from '@mui/icons-material/Home';
export const ProblemStatementsListView = () => {
  const [dat, setDat] = useState([]);
  const [select, setSelect] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('number');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
const toast = useToast()
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelect(params.get('search') || '');
    setFilter(params.get('filter') || 'all');
    setSort(params.get('sort') || 'number');

    fetchTasks();
  }, [location.search]);

  const fetchTasks = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_Server + '/statements'
      );
      setIsLoading(false);
      setDat(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate({ search: params.toString() });
  };

  const handleSearchChange = (e) => {
    setSelect(e.target.value);
    updateQueryParams('search', e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    updateQueryParams('filter', e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    updateQueryParams('sort', e.target.value);
  };

  const handleReset = () => {
    setSelect('');
    setFilter('all');
    setSort('number');
    navigate({ search: '' });
  };

  const handleDownloadExcel = async (rowData) => {
    try {
      // Extract only required fields from rowData
      const dataToExport = {
        Number: rowData.Number,
        Theme: rowData.Theme,
        Statement: rowData.Statement,
        Desc: rowData.Desc
      };
  
      const worksheet = XLSX.utils.json_to_sheet([dataToExport]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Problem Statement');
  
      const time = new Date().toLocaleDateString().replaceAll('/', '-');
      XLSX.writeFile(workbook, `problem_statement_${rowData.Number}_down_on_${time}.xlsx`);
    } catch (error) {
      console.error('Error downloading Excel:', error);
    }
  };
  
  const handleDownloadAllExcel = async () => {
    try {
      const dataToExport = sortedData.map(task => ({
        Number: task.Number,
        Theme: task.Theme,
        Statement: task.Statement,
        Desc: task.Desc
      }));
  
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  
      XLSX.utils.book_append_sheet(workbook, worksheet, 'All Problem Statements');
  
      const time = new Date().toLocaleDateString().replaceAll('/', '-');
      XLSX.writeFile(workbook, `all_problem_statements_on_${time}.xlsx`);
    } catch (error) {
      console.error('Error downloading all Excel:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hackathon Problem Statements',
        text: 'Check out these problem statements!',
        url: window.location.href
      }).then(() => {
      toast({
        title:'Shared successfully',
        status:"success",
        isClosable:true,
        position: "top-right"
      });
      }).catch((error) => {
        toast({
          title:'Not shared',
          status:"error",
          isClosable:true,
          position: "top-right"
        });
        console.error('Error sharing:', error);
      });
    } else {
      console.log('Web Share API not supported');
      toast({
        title:'Sharing Not Supported',
        status:"error",
        isClosable:true,
        position: "top-right"
      });
      // Fallback or inform the user that sharing is not supported
    }
  };

  const filteredData = dat
    .filter((val) => {
      if (filter === 'all') return true;
      return val?.Theme?.toLowerCase() === filter;
    })
    .filter(
      (val) =>
        val?.Theme?.toLowerCase() === filter || // Filter by theme if selected
        val?.Number?.includes(select) || // Filter by number
        val?.Statement?.toLowerCase().includes(select.toLowerCase()) || // Filter by title
        val?.Desc?.toLowerCase().includes(select.toLowerCase()) // Filter by description
    );

  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'number') {
      return a?.Number?.localeCompare(b?.Number);
    } else if (sort === 'theme') {
      return a?.Theme?.localeCompare(b?.Theme);
    } else if (sort === 'title') {
      return a?.Statement?.localeCompare(b?.Statement);
    } else {
      return 0;
    }
  });

  return (
    <>
      <HackathonNav />

      <Box margin={5} boxShadow="base" p="6" rounded="md" bg="white">
      
        <Box display="flex" justifyContent="right" mb={6} gap={6} m={4}>
        <Button onClick={()=>window.location.href="/bootcamp"}>
          <HomeIcon />
        </Button>
          <Button onClick={() => (window.location.href = '/registerps')} fontSize={{ base: '0.6em', md: '0.9em' }} overflow="hidden">
            Select Problem Statement
          </Button>
          <Button onClick={() => (window.location.href = '/htrs')}  fontSize={{ base: '0.6em', md: '0.9em' }} overflow="hidden">
            Create Team
          </Button>
          {dat.length > 0 &&<Button onClick={handleDownloadAllExcel}>
            <Tooltip label="Download all problem statements">
              <GridOnIcon />
            </Tooltip>
          </Button>}
          
        
        </Box>
        <Box display="flex" justifyContent="center" mb={6}>
          <Input
            id="search"
            value={select}
            placeholder="Search problem statement name or number"
            onChange={handleSearchChange}
            width="70%"
          />
            <Button onClick={handleShare}>
            <Tooltip label="Share problem statements">
              <ShareIcon />
            </Tooltip>
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mb={6}>
          <Select width="30%" value={filter} onChange={handleFilterChange}>
            <option value="all">All Themes</option>
            <option value="sports">Sports</option>
            <option value="yoga">Health & Yoga</option>
          </Select>
          <Select width="30%" value={sort} onChange={handleSortChange}>
            <option value="number">Sort by Number</option>
            <option value="theme">Sort by Theme</option>
            <option value="title">Sort by Title</option>
          </Select>
          <Button ml={4} onClick={handleReset}>
            Reset
          </Button>
        </Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <Spinner size="xl" />
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" mb={6}>
            <Box overflow="auto" maxH="100vh">
              <TableContainer>

              <Table variant="striped" colorScheme='gray'>
                <Thead >
                  <Tr >
                    <Th>Number</Th>
                    <Th>Theme</Th>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Download</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedData?.map((task) => (
                    (task?.Users?.length < 3 || !task?.Users) && (
                      <Tr key={task?.Number}>
                        <Td>{task?.Number}</Td>
                        <Td>{task?.Theme}</Td>
                        <Td>{task?.Statement}</Td>
                        <Td>
                          <Tooltip label={task?.Desc}>
                            {task?.Desc?.substring(0, 200)}
                          </Tooltip>
                        </Td>
                        <Td>
                          <Button onClick={() => handleDownloadExcel(task)}>
                            <Tooltip label="Download this problem statement">
                              <GridOnIcon />
                            </Tooltip>
                          </Button>
                        </Td>
                      </Tr>
                    )
                  ))}
                </Tbody>
              </Table>
              </TableContainer>

            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
