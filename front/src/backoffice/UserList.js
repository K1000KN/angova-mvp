import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import { Group as GroupIcon } from "@mui/icons-material";

import EditForm from "./EditForm";

const UserList = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [selectedAdminIds, setSelectedAdminIds] = useState([]); // Define selectedAdminIds state
  const [selectedManagerIds, setSelectedManagerIds] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Define selectedUser state

  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error state or display an error message
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [editUserId, openEditDialog, fetchUsers]);

  const handleDelete = async (id) => {
    setDeleteUserId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/user/delete/${deleteUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Status: ", response.status);
      fetchUsers();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle error state or display an error message
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = (id) => {
    setEditUserId(id);
    setOpenEditDialog(true);
    const user = users.find((user) => user._id === id);
    setSelectedUser(user); // Set the selected user
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const adminUsers = users.filter((user) =>
    user.roles.some((role) => role.name === "admin")
  );
  const managerUsers = users.filter((user) =>
    user.roles.some((role) => role.name === "manager")
  );
  const normalUsers = users.filter(
    (user) =>
      !user.roles.some(
        (role) => role.name === "admin" || role.name === "manager"
      )
  );

  const handleManagerClick = (managerId) => {
    if (selectedManagerIds.includes(managerId)) {
      setSelectedManagerIds((prevState) =>
        prevState.filter((id) => id !== managerId)
      );
    } else {
      setSelectedManagerIds((prevState) => [...prevState, managerId]);
    }
  };

  const handleAdminClick = (adminId) => {
    if (selectedAdminIds.includes(adminId)) {
      setSelectedAdminIds((prevState) =>
        prevState.filter((id) => id !== adminId)
      );
    } else {
      setSelectedAdminIds((prevState) => [...prevState, adminId]);
    }
  };

  const renderAdminUsersTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Utilisateur</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminUsers.map((admin) => (
            <React.Fragment key={admin._id}>
              <TableRow key={admin._id}>
                <TableCell>{admin._id}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    style={{ marginRight: "8px" }}
                    onClick={() => handleAdminClick(admin._id)}
                  >
                    <GroupIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(admin._id)}
                    style={{ marginRight: "8px" }}
                  >
                    Modifier
                  </Button>
                  {adminUsers.length === 1 ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={null}
                      disabled={true}
                    >
                      Supprimer
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(admin._id)}
                    >
                      Supprimer
                    </Button>
                  )}
                </TableCell>
              </TableRow>
              {selectedAdminIds.includes(admin._id) && (
                <TableRow>
                  <TableCell colSpan={4}>
                    {renderAdminNestedTable(admin._id)}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderManagerUsersTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Utilisateur</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managerUsers.map((manager) => (
            <React.Fragment key={manager._id}>
              <TableRow>
                <TableCell>{manager._id}</TableCell>
                <TableCell>{manager.username}</TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    style={{ marginRight: "8px" }}
                    onClick={() => handleManagerClick(manager._id)}
                  >
                    <GroupIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(manager._id)}
                    style={{ marginRight: "8px" }}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(manager._id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
              {selectedManagerIds.includes(manager._id) && (
                <TableRow>
                  <TableCell colSpan={4}>
                    {renderManagerNestedTable(manager._id)}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderAdminNestedTable = (adminId) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Utilisateur</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users
          .filter((user) =>
            user.roles.every(
              (role) =>
                role.name !== "user" &&
                role.name !== "admin" &&
                user.admin === adminId
            )
          )
          .map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(user._id)}
                  style={{ marginRight: "8px" }}
                >
                  Modifier
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(user._id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  const renderManagerNestedTable = (managerId) => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Utilisateur</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users
          .filter((user) =>
            user.roles.every(
              (role) =>
                role.name !== "manager" &&
                role.name !== "admin" &&
                user.manager === managerId
            )
          )
          .map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(user._id)}
                  style={{ marginRight: "8px" }}
                >
                  Modifier
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(user._id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  const renderNormalUsersTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Utilisateur</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {normalUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(user._id)}
                  style={{ marginRight: "8px" }}
                >
                  Modifier
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(user._id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      <Typography variant="h6">Admin</Typography>
      {renderAdminUsersTable()}
      <br />
      <Typography variant="h6">Manager</Typography>
      {renderManagerUsersTable()}
      <br />
      <Typography variant="h6">Utilisateur</Typography>
      {renderNormalUsersTable()}
      <EditForm
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        userId={editUserId}
        fetchUsers={fetchUsers}
        user={selectedUser}
      />

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation de la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Annuler</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
