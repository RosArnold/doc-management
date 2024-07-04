import React, { useState, useEffect } from "react";
import { useFileManager } from "../hooks/useFileManager";

import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SaveIcon from "@mui/icons-material/Save";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import UploadIcon from "@mui/icons-material/Upload";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Toolbar,
  AppBar,
  Stack,
  Grid,
  Breadcrumbs,
  Link,
  CssBaseline,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const FileManager: React.FC = () => {
  const {
    files,
    folderStack,
    open: isDialogOpen,
    createFolderResult,
    folderListResult,
    fetchFolder,
    handleCreate,
    handleUpload,
    handleDownload,
    handleDelete,
    handleBackClick,
    handleFolderClick,
    handleDialogOpen,
    handleDialogClose,
    handleBreadcrumbsClick,
  } = useFileManager();

  return (
    <Grid>
      <AppBar position="static">
        <Toolbar>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              startIcon={<CreateNewFolderIcon />}
              onClick={handleDialogOpen}
            >
              New Folder
            </Button>
            <Dialog
              open={isDialogOpen}
              onClose={handleDialogClose}
              PaperProps={{
                component: "form",
                onSubmit: handleCreate,
              }}
            >
              <DialogTitle></DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to create a new holder? Please enter
                  your folder name here.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="folderName"
                  label="What is the folder name?"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  loading={createFolderResult.isLoading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  type="submit"
                >
                  Create
                </LoadingButton>
                <Button onClick={handleDialogClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
            <input
              accept="*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
              >
                Upload File
              </Button>
            </label>
          </Stack>
        </Toolbar>
      </AppBar>

      <Paper>
        <Box sx={{ p: 2 }}>
          <Breadcrumbs separator="›">
            <Link onClick={() => handleBreadcrumbsClick("")}>Root</Link>
            {folderStack.slice(0, -1).map((folder, index) => (
              <Link
                key={index}
                onClick={() => handleBreadcrumbsClick(folder.id)}
              >
                {folder.name}
              </Link>
            ))}
            {folderStack.length > 0 && (
              <Typography>{folderStack.slice(-1)[0].name}</Typography>
            )}
          </Breadcrumbs>
        </Box>
        <Divider />
        <List>
          {folderStack.length > 0 && (
            <ListItem onClick={handleBackClick} style={{ marginLeft: 8 }}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText>...</ListItemText>
            </ListItem>
          )}

          {files.map((file, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                if (file.type === "folder") handleFolderClick(file.id);
              }}
            >
              <ListItemIcon>
                {file.type === "file" ? <TaskIcon /> : <FolderIcon />}
              </ListItemIcon>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <Stack spacing={1} direction="row">
                  <IconButton edge="end" aria-label="share">
                    <PersonAddAltIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="download">
                    <DownloadIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(file.id, file.type)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default FileManager;
