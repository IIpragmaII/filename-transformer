import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useState } from 'react';

export default function App() {
  const [folderPath, setFolderPath] = useState();

  const onClick = () => {
    window.electron.ipcRenderer
      .invoke('open')
      .then((folderPath) => folderPath && setFolderPath(folderPath));
  };

  return (
    <Box>
      <Typography variant="h4" color={'primary'}>
        Filename Transformer
      </Typography>
      <Typography>
        Select folder where files are stored on your local system. Then Press
        "Get Filenames" to start transforming.
      </Typography>
      <Box display={'flex'} marginTop={3}>
        <TextField
          sx={{ width: '100%' }}
          value={folderPath || ''}
          label="Select Folder"
          InputLabelProps={{ shrink: !!folderPath }}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClick}
                  edge="end"
                >
                  <FolderOpenIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box display={'flex'} marginTop={2}>
        <Button sx={{ marginY: 'auto' }} startIcon={<PlayCircleFilledIcon />}>
          Get Filenames
        </Button>
      </Box>
    </Box>
  );
}
