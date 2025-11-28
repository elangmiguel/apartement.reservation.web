'use client';

import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CCol,
    CRow,
    CBadge,
} from '@coreui/react';
import { userService } from '@/lib/api/services';
import DataTable from '@/components/DataTable';
import { toast } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        status: 'ACTIVE',
    });

    const fetchUsers = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await userService.getAll(page - 1, 10);
            setUsers(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({
            username: user.username || '',
            email: user.email || '',
            password: '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            status: user.status || 'ACTIVE',
        });
        setShowModal(true);
    };

    const handleDelete = async (user: any) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.delete(user.id);
                toast.success('User deleted successfully');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const submitData = editingUser && !formData.password
                ? { ...formData, password: undefined }
                : formData;

            if (editingUser) {
                await userService.update(editingUser.id, submitData);
                toast.success('User updated successfully');
            } else {
                await userService.create(submitData);
                toast.success('User created successfully');
            }
            setShowModal(false);
            fetchUsers();
            resetForm();
        } catch (error) {
            toast.error('Failed to save user');
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            status: 'ACTIVE',
        });
        setEditingUser(null);
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        {
            key: 'status',
            label: 'Status',
            render: (value: string) => (
                <CBadge color={value === 'ACTIVE' ? 'success' : value === 'INACTIVE' ? 'secondary' : 'warning'}>
                    {value}
                </CBadge>
            ),
        },
    ];

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Users</strong>
                            <CButton
                                color="primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add User
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                columns={columns}
                                data={users}
                                loading={loading}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal visible={showModal} onClose={() => setShowModal(false)}>
                <CModalHeader>
                    <CModalTitle>{editingUser ? 'Edit' : 'Add'} User</CModalTitle>
                </CModalHeader>
                <CForm onSubmit={handleSubmit}>
                    <CModalBody>
                        <div className="mb-3">
                            <CFormLabel htmlFor="username">Username</CFormLabel>
                            <CFormInput
                                type="text"
                                id="username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="email">Email</CFormLabel>
                            <CFormInput
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="password">
                                Password {editingUser && '(leave blank to keep current)'}
                            </CFormLabel>
                            <CFormInput
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!editingUser}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="status">Status</CFormLabel>
                            <CFormSelect
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="SUSPENDED">Suspended</option>
                            </CFormSelect>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </CButton>
                        <CButton color="primary" type="submit">
                            Save
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    );
};

export default Users;
