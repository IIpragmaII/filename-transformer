import {
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useEffect, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';

export default function App() {
  const [folderPath, setFolderPath] = useState();
  const [loading, setLoading] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    window?.electron?.ipcRenderer
      .invoke('getFolderPath')
      .then((initialFolderPath) => setFolderPath(initialFolderPath))
      .catch(() => {});
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const onClick = () => {
    window.electron.ipcRenderer
      .invoke('open')
      .then(
        (selectedFolderPath) =>
          selectedFolderPath && setFolderPath(selectedFolderPath),
      )
      .catch(() => {});
  };

  const onStartTransforming = () => {
    setLoading(true);
    window.electron.ipcRenderer
      .invoke('transform', folderPath)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ margin: 2 }}>
        <Typography variant="h4" color="primary">
          Filename Transformer
        </Typography>
        <Typography>
          Select folder where files are stored on your local system. Then Press
          &quot;Get Filenames&quot; to start transforming.
        </Typography>
        <Box display="flex" marginTop={3}>
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
        <Box display="flex" marginTop={2}>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            onClick={onStartTransforming}
            variant="contained"
            sx={{ marginY: 'auto' }}
            startIcon={<PlayCircleFilledIcon />}
            disabled={!folderPath}
          >
            Get Filenames
          </LoadingButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
