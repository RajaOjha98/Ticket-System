import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicketStatus, addNoteToTicket } from '../services/ticketService';
import AuthContext from '../context/AuthContext';
import moment from 'moment';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem
} from '@mui/material';
import { Send as SendIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'error';
    case 'Pending':
      return 'warning';
    case 'Closed':
      return 'success';
    default:
      return 'default';
  }
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newNote, setNewNote] = useState('');
  const [noteFile, setNoteFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      const response = await getTicketById(id);
      
      if (response.success) {
        setTicket(response.data);
      } else {
        setError(response.error);
      }
      
      setLoading(false);
    };

    fetchTicket();
  }, [id]);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleFileChange = (e) => {
    setNoteFile(e.target.files[0]);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    
    if (!newNote.trim()) return;
    
    setSubmitting(true);
    
    const noteData = {
      text: newNote,
      attachment: noteFile
    };
    
    const response = await addNoteToTicket(id, noteData);
    
    if (response.success) {
      setTicket(response.data);
      setNewNote('');
      setNoteFile(null);
    } else {
      setError(response.error);
    }
    
    setSubmitting(false);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    
    setStatusUpdating(true);
    
    const response = await updateTicketStatus(id, newStatus);
    
    if (response.success) {
      setTicket(response.data);
    } else {
      setError(response.error);
    }
    
    setStatusUpdating(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );
  }

  if (!ticket) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        Ticket not found
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Ticket: {ticket.ticketId}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {ticket.title}
          </Typography>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/tickets')}
            sx={{ mr: 1 }}
          >
            Back to List
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Customer
            </Typography>
            <Typography variant="body1">
              {ticket.customer.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Opened
            </Typography>
            <Typography variant="body1">
              {moment(ticket.createdAt).format('MMM D, YYYY h:mm A')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Last Updated
            </Typography>
            <Typography variant="body1">
              {moment(ticket.updatedAt).format('MMM D, YYYY h:mm A')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            {user && (user.role === 'admin' || user.role === 'agent') ? (
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  value={ticket.status}
                  onChange={handleStatusChange}
                  disabled={statusUpdating}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Chip 
                label={ticket.status} 
                color={getStatusColor(ticket.status)} 
                size="small" 
              />
            )}
          </Box>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Notes & Responses
      </Typography>

      <Paper sx={{ mb: 3, p: 0 }}>
        <List sx={{ p: 0 }}>
          {ticket.notes.length === 0 ? (
            <ListItem>
              <Typography variant="body2" color="text.secondary">
                No notes yet.
              </Typography>
            </ListItem>
          ) : (
            ticket.notes.map((note, index) => (
              <React.Fragment key={note._id || index}>
                <ListItem sx={{ display: 'block', py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: note.createdBy?.role === 'customer' ? 'primary.main' : 'secondary.main', mr: 2 }}>
                      {note.createdBy?.name ? note.createdBy.name.charAt(0).toUpperCase() : '?'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2">
                          {note.createdBy?.name || 'Unknown User'}
                          <Chip 
                            label={note.createdBy?.role || 'unknown'} 
                            size="small" 
                            sx={{ ml: 1, textTransform: 'capitalize' }} 
                          />
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {moment(note.createdAt).format('MMM D, YYYY h:mm A')}
                        </Typography>
                      </Box>
                      <Typography variant="body1" gutterBottom>
                        {note.text}
                      </Typography>
                      {note.attachment && (
                        <Button 
                          size="small" 
                          startIcon={<AttachFileIcon />}
                          href={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${note.attachment}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Attachment
                        </Button>
                      )}
                    </Box>
                  </Box>
                </ListItem>
                {index < ticket.notes.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Response
        </Typography>
        <Box component="form" onSubmit={handleAddNote}>
          <TextField
            fullWidth
            label="Your response"
            multiline
            rows={4}
            variant="outlined"
            value={newNote}
            onChange={handleNoteChange}
            required
          />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
            >
              {noteFile ? noteFile.name : 'Attach File'}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!newNote.trim() || submitting}
            >
              {submitting ? 'Sending...' : 'Send Response'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TicketDetail; 