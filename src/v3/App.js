import axios from 'axios';
import { Button, Container, TextField, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RegularTable from './RegularTable';

// server https://taskapp-serv.herokuapp.com/

function V3App() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editTaskId, setEditTaskId] = useState(null);


  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onLoadAll();
    return () => {
    };
  }, []);

  const onLoadAll = () => {
    setIsLoading(true);
    axios({
      url: 'https://taskapp-serv.herokuapp.com/v1/task/search',
      method: 'POST',
    })
      .then((response) => {
          setTasks(response.data);
        }
      ).catch((err) => {
        console.log(err);
      }
    ).finally(() => {
      setIsLoading(false);
    });

  };

  // create task
  const onCreate = () => {
    setIsLoading(true);
    axios({
      url: 'https://taskapp-serv.herokuapp.com/v1/task',
      method: 'POST',
      data: { title, description },
    })
      .then(() => {
          onLoadAll();
          setEditTaskId(null);
          setTitle('');
          setDescription('');
        }
      ).catch((err) => {
      console.log(err);
    });
  };


  const onDelete = (id) => {
    axios({
      url: `https://taskapp-serv.herokuapp.com/v1/task/${id}`,
      method: 'DELETE',
    })
      .then(() => {
          onLoadAll();
        }
      ).catch((err) => {
        console.log(err);
      }
    );
  };

  const onEdit = (task) => {
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const onUpdate = () => {
    setIsLoading(true);
    setEditTaskId(null);
    axios({
      url: `https://taskapp-serv.herokuapp.com/v1/task/${editTaskId}`,
      method: 'PATCH',
      data: { title, description },
    })
      .then(() => {
          onLoadAll();
        }
      ).catch((err) => {
        console.log(err);
      }
    );
  };

  const onCancel = () => {
    setEditTaskId(null);
    setTitle('');
    setDescription('');
  }

  // create and edit form
  const taskForm = () => <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >

    <TextField
      required
      id="title"
      label="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <TextField
      required
      id="description"
      label="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    {editTaskId
      ? <>
        <Button variant="outlined"
                size={'large'}
                onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={onUpdate}>Update</Button>
      </>
      : <Button variant="contained" onClick={onCreate}>Create</Button>
    }

  </Box>;

  const columns = [
    {
      headerName: 'ID',
      field: 'id',
      flex: 0.2
    },

    {
      headerName: 'Title',
      field: 'title',
      flex: 0.2
    },

    {
      headerName: 'Description',
      field: 'description',
      flex: 0.2
    },

    {
      headerName: 'Actions',
      field: 'actions',
      flex: 0.2,
      renderCell: ({ row }) => <>
        <Button variant="outlined" color="error"
                onClick={() => onDelete(row.id)}
                sx={{ marginRight: 2 }}
        >Delete</Button>
        <Button variant="outlined" onClick={() => onEdit(row)}>Edit</Button>
      </>,
    },
  ];


  return (
    <Container fixed>
      <h1>V3 {isLoading && <>Loading...</>}</h1>

      <RegularTable rows={tasks} columns={columns}
                    getRowId={(row) => row.id} />


      {editTaskId ? <h4>Edit Task</h4> : <h4>Create Task</h4>}

      {taskForm()}

    </Container>
  );
}

export default V3App;


