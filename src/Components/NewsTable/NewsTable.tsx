import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  Table, TableBody, TableCell, TableContainer, TableHead , TableRow, Paper, TablePagination} from '@material-ui/core';
import  moment  from 'moment'


const useStyles = makeStyles({
    root: {
      width: '100%',
      marginTop: 50,
    },
    container: {
       maxHeight: 500,
    },
    // table: {
    //     minWidth: 650,
    //   },
  })

interface Props {
    data:[{
      author: string;
      content: string;
      description:string;
      publishedAt: string;
      title:  string;
      url:  string;
      urlToImage: string;
      source:{
        id: string
        name: string
      }
    }]
    setPage: Function;
    page: number;
    setRowsPerPage: Function;
    rowsPerPage: number;
    handleSort: Function;
  }

const NewsTable: React.FC<Props> = ({data , setPage, page, rowsPerPage, setRowsPerPage, handleSort}) => {
  const classes = useStyles();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  return (
    <Paper className={classes.root}>
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead onClick={() => handleSort()}>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Source</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.url}>
              <TableCell align="center">
                  <img style={{
                      height: 50,
                      width: 50
                  }} 
                  alt="thumbnail"
                   src={row.urlToImage} />
                  </TableCell>
              <TableCell align="center">{row.source.name}</TableCell>
              <TableCell align="center">{row.author}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">
                  {moment(row.publishedAt).format('DD MMM YYYY HH:MM:SS')}</TableCell>
              <TableCell align="center">
              <a
                  href={
                    `${row.url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 Link
                </a>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={100}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}

    />
    </Paper>
  );
}

export default NewsTable;