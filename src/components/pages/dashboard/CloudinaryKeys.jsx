"use client";

import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiCloud, FiCheck, FiX } from "react-icons/fi";
import api from "@/lib/api";
import Link from "next/link";

function maskKey(key) {
  if (!key) return "";
  return key.slice(0, 6) + "••••••••••••" + key.slice(-4);
}

const CloudinaryKeys = () => {
  const [cloudinaryKeys, setCloudinaryKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editKey, setEditKey] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // delete state
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const getCloudinaryKeys = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/keys/cloudinary");
      setCloudinaryKeys(res.data);
    } catch {
      setError("Failed to load Cloudinary accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCloudinaryKeys();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditKey("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditKey("");
  };

  const handleUpdate = async (id) => {
    setEditLoading(true);
    try {
      const payload = { name: editName };
      if (editKey) payload.api_key = editKey;
      await api.put(`/api/keys/cloudinary/${id}`, payload);
      await getCloudinaryKeys();
      cancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/api/keys/cloudinary/${id}`);
      setCloudinaryKeys((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <FiCloud size={22} className="text-primary" />
          <h2 className="text-xl font-bold text-base-content">
            Cloudinary Accounts
          </h2>
        </div>
        <Link href="/dashboard/keys/cloudinary/add">Add Key</Link>
      </div>

      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>API Key</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            )}

            {!loading && cloudinaryKeys.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-base-content/50 text-sm"
                >
                  No Cloudinary accounts added yet.
                </td>
              </tr>
            )}

            {!loading &&
              cloudinaryKeys.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>

                  {editingId === item.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered input-sm w-full max-w-40"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Name"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered input-sm w-full max-w-40"
                          value={editKey}
                          onChange={(e) => setEditKey(e.target.value)}
                          placeholder="Keys can't be edited"
                          disabled
                        />
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleUpdate(item.id)}
                            disabled={editLoading || !editName}
                          >
                            {editLoading ? (
                              <span className="loading loading-spinner loading-xs" />
                            ) : (
                              <FiCheck size={15} />
                            )}
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={cancelEdit}
                            disabled={editLoading}
                          >
                            <FiX size={15} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="font-medium">{item.name}</td>
                      <td className="font-mono text-sm text-base-content/60">
                        {maskKey(item.key)}
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="btn btn-ghost btn-sm text-info"
                            onClick={() => startEdit(item)}
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() => setConfirmDeleteId(item.id)}
                            disabled={deletingId === item.id}
                          >
                            {deletingId === item.id ? (
                              <span className="loading loading-spinner loading-xs" />
                            ) : (
                              <FiTrash2 size={15} />
                            )}
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <div className={`modal ${confirmDeleteId ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete this Cloudinary account? This action
            cannot be undone.
          </p>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => setConfirmDeleteId(null)}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={() => {
                handleDelete(confirmDeleteId);
                setConfirmDeleteId(null);
              }}
              disabled={deletingId === confirmDeleteId}
            >
              {deletingId === confirmDeleteId ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudinaryKeys;
