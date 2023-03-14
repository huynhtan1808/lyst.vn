'use client'

import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/db_types'
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
};
export default function RegisterUser() {

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  
// handle change function

  const handleChange = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
//handle image function

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      setLoading(true);
    };
    const files = e.target.files[0];
    if (!files) return;
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "c_tags");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/kizmelvin/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setFormData({ ...formData, avatar: file.secure_url });
    setLoading(false);
  };
  
//create user function

  const createUser = async () => {
    const res = await supabase.from("profiles").insert([
      {
        first_name: `${formData.firstName}`,
        last_name: `${formData.lastName}`,
        email: `${formData.email}`,
        avatar: `${formData.avatar}`,
      },
    ]);
    if (res.error === null && res.status === 201) {
      setStatus(true);
      setFormData(initialState);
      setTimeout(() => {
        setStatus(false);
      }, 5000);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="fs-1 m-3"> Register User</h1>
      {status && (
        <div className="mt-3 mb-3 text-success">
          User registered successfully!
        </div>
      )}
      <div style={{ width: "400px" }}>
        <Form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="fs-5">Avatar</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleImage(e)}
            />
          </Form.Group>
          <Form.Group className="mb-1 h-10">
            <Form.Label className="fs-5">First Name</Form.Label>
            <Form.Control
              size="md"
              type="text"
              name="firstName"
              required
              onChange={handleChange}
              value={formData.firstName ?? ""}
              placeholder="first name"
            />
          </Form.Group>
          <Form.Group className="mb-1 h-10">
            <Form.Label className="fs-5">Last Name</Form.Label>
            <Form.Control
              size="md"
              type="text"
              name="lastName"
              required
              onChange={handleChange}
              value={formData.lastName ?? ""}
              placeholder="last name"
            />
          </Form.Group>
          <Form.Group className="mb-1 h-10">
            <Form.Label className="fs-5">Email</Form.Label>
            <Form.Control
              size="md"
              type="text"
              name="email"
              required
              onChange={handleChange}
              value={formData.email ?? ""}
              placeholder="email"
            />
          </Form.Group>
          <div>
            <Button
              className="mt-3"
              type="submit"
              variant="primary"
              disabled={loading}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}