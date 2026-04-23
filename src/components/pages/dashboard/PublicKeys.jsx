"use client";

import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiCloud, FiCheck, FiX } from "react-icons/fi";
import api from "@/lib/api";
import Link from "next/link";
import Loader from "@/components/utilities/Loader";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import ErrorModal from "@/components/utilities/ErrorModal";
import SuccessModal from "@/components/utilities/SuccessModal";

function maskKey(key) {
  if (!key) return "";
  return key.slice(0, 6) + "••••••••••••" + key.slice(-4);
}

const PublicKeys = () => {
  const [publicKeys, setPublicKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editKey, setEditKey] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // delete state
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const getPublicKeys = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/keys/public");
      setPublicKeys(res.data);
    } catch {
      setError("Failed to load Cloudinary accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublicKeys();
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
      await api.put(`/api/keys/public/${id}`, payload);
      await getPublicKeys();
      setSuccess("Cloudinary account updated successfully");
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
      await api.delete(`/api/keys/public/${id}`);
      setPublicKeys((prev) => prev.filter((k) => k.id !== id));
      setSuccess("Cloudinary account deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="px-4 pt-2 pb-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-base-content">
          <FiCloud size={22} className="text-primary inline mr-2 mb-0.5" />
          Public Keys
        </h2>
        <Link href="/dashboard/keys/public/add">Add Key</Link>
      </div>

      {error && <ErrorModal message={error} />}
      {success && (
        <SuccessModal
          message={success}
          link={["Cloudinary Keys", "/dashboard/keys/cloudinary"]}
        />
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
            {!loading && publicKeys.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-base-content/50 text-sm"
                >
                  No Public keys added yet.
                </td>
              </tr>
            )}

            {!loading &&
              publicKeys.map((item, index) => (
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

      <div className={`modal ${confirmDeleteId ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Confirm Delete</h3>
          <div className="flex items-center justify-center mt-4">
            <DotLottieReact
              src="https://lottie.host/e2f957e8-68c9-4dc2-b263-9d4c9a784a99/Sh2ter556t.lottie"
              loop
              autoplay
              className="max-w-xs"
            />
          </div>
          <p className="pt-4 text-center text-warning">
            Are you sure you want to delete this public key? This action cannot
            be undone.
          </p>
          <div className="modal-action">
            <button
              className="btn btn-info btn-soft"
              onClick={() => setConfirmDeleteId(null)}
            >
              <MdOutlineCancel size={16} />
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
              <FaCheckCircle />
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

export default PublicKeys;
