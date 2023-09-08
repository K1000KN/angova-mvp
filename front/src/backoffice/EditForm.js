import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";

const EditForm = ({ open, handleClose, userId, fetchUsers, user }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editReferent, setEditReferent] = useState("");
  const [managers, setManagers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setEditUsername(user.username);
      setEditEmail(user.email);
      setEditReferent(user.manager || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchUsersByRole = async (role) => {
      try {
        const response = await axios.get(`${apiUrl}/user/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredUsers = response.data.filter((user) =>
          user.roles.some((r) => r.name === role)
        );

        if (role === "manager") {
          setManagers(filteredUsers);
        } else if (role === "admin") {
          setAdmins(filteredUsers);
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error state or display an error message
      }
    };

    fetchUsersByRole("manager");
    fetchUsersByRole("admin");
  }, [token]);

  const handleEditSave = async () => {
    try {
      let isManager = user.roles.some((role) => role.name === "manager");
      let isUser = user.roles.some((role) => role.name === "user");

      const response = await axios.patch(
        `${apiUrl}/user/${userId}`,
        {
          username: editUsername,
          email: editEmail,
          managerId: isUser === true ? editReferent : null,
          adminId: isManager === true ? editReferent : null,
          roles: user.roles.map((role) => role.name),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
      // Handle error state or display an error message
    }
  };

  const renderReferentSelect = () => {
    if (user && user.roles) {
      const isManager = user.roles.some((role) => role.name === "manager");
      const isUser = user.roles.some((role) => role.name === "user");

      if (isManager) {
        return (
          <Select
            value={editReferent}
            onChange={(e) => setEditReferent(e.target.value)}
            fullWidth
            margin="dense"
            label="Referent"
          >
            {admins.map((admin) => (
              <MenuItem key={admin._id} value={admin._id}>
                {admin.username}
              </MenuItem>
            ))}
          </Select>
        );
      }

      if (isUser) {
        return (
          <Select
            value={editReferent}
            onChange={(e) => setEditReferent(e.target.value)}
            fullWidth
            margin="dense"
            label="Referent"
          >
            {managers.map((manager) => (
              <MenuItem key={manager._id} value={manager._id}>
                {manager.username}
              </MenuItem>
            ))}
          </Select>
        );
      }
    }

    return null;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          fullWidth
          margin="dense"
          value={editUsername}
          onChange={(e) => setEditUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="dense"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />
        {renderReferentSelect()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEditSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
