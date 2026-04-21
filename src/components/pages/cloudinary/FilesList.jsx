"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiEye, FiImage, FiTrash2 } from "react-icons/fi";
import { SiCloudinary } from "react-icons/si";
import api from "@/lib/api";

const FilesList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [publicApiKey, setPublicApiKey] = useState("");
  const [publicCloudName, setPublicCloudName] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTargetIds, setDeleteTargetIds] = useState([]);

  const [previewFile, setPreviewFile] = useState(null);
  const previewDialogRef = useRef(null);

  const getPublicKey = useCallback(async () => {
    try {
      const res = await api.get("/api/keys/public");
      const keys = Array.isArray(res.data) ? res.data : [];
      const first = keys[0] || {};
      const firstKey = first.key || "";
      const firstName = first.name || "";
      setPublicApiKey(firstKey);
      setPublicCloudName(firstName);
      return { key: firstKey, name: firstName };
    } catch {
      setPublicApiKey("");
      setPublicCloudName("");
      return { key: "", name: "" };
    }
  }, []);

  const getFiles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { key, name } = await getPublicKey();
      if (!key) {
        setFiles([]);
        setError("No public key found. Add a public key first.");
        return;
      }
      if (!name) {
        setFiles([]);
        setError("No cloud/bucket name found on the first public key.");
        return;
      }

      const res = await api.get("/api/cloudinary/files", {
        headers: {
          Authorization: `Bearer ${key}`,
        },
        params: {
          name,
        },
      });
      const payloadFiles = Array.isArray(res.data?.files)
        ? res.data.files
        : Array.isArray(res.data)
          ? res.data
          : [];
      setFiles(payloadFiles);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to load files.",
      );
    } finally {
      setLoading(false);
    }
  }, [getPublicKey]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const selectedCount = selectedIds.length;
  const allSelected = useMemo(
    () => files.length > 0 && selectedCount === files.length,
    [files.length, selectedCount],
  );

  const isPreviewable = (file) => {
    if (!file?.secure_url) return false;
    const type = String(file.resource_type || "").toLowerCase();
    return type === "image" || type === "video";
  };

  const formatBytes = (bytes) => {
    if (typeof bytes !== "number" || Number.isNaN(bytes)) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const openPreview = (file) => {
    setPreviewFile(file);
    if (
      previewDialogRef.current &&
      typeof previewDialogRef.current.showModal === "function"
    ) {
      previewDialogRef.current.showModal();
      return;
    }
    if (file?.secure_url && typeof window !== "undefined") {
      window.open(file.secure_url, "_blank", "noopener,noreferrer");
    }
  };

  const closePreview = () => {
    if (previewDialogRef.current?.open) {
      previewDialogRef.current.close();
    }
    setPreviewFile(null);
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(files.map((file) => file.id));
  };

  const askDeleteSingle = (id) => {
    setDeleteTargetIds([id]);
  };

  const askDeleteSelected = () => {
    if (!selectedCount) return;
    setDeleteTargetIds(selectedIds);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setDeleteTargetIds([]);
  };

  const handleDelete = async () => {
    if (!deleteTargetIds.length) return;
    setIsDeleting(true);
    setError("");
    setSuccess("");

    let key = publicApiKey;
    let name = publicCloudName;
    if (!key) {
      const resolved = await getPublicKey();
      key = resolved.key;
      name = resolved.name;
    }
    if (!key) {
      setIsDeleting(false);
      setError("No public key found. Add a public key first.");
      return;
    }
    if (!name) {
      setIsDeleting(false);
      setError("No cloud/bucket name found on the first public key.");
      return;
    }
    try {
      const res = await api.delete("/api/cloudinary/files", {
        headers: {
          Authorization: `Bearer ${key}`,
        },
        data: {
          files: deleteTargetIds,
          name,
        },
      });

      const deletedFiles = Array.isArray(res.data?.deleted_files)
        ? res.data.deleted_files
        : [];
      const failedFiles = Array.isArray(res.data?.failed_files)
        ? res.data.failed_files
        : [];

      const deletedIds = deletedFiles
        .map((item) => item?.file_id)
        .filter((id) => Number.isInteger(id));

      if (deletedIds.length > 0) {
        setFiles((prev) =>
          prev.filter((file) => !deletedIds.includes(file.id)),
        );
        setSelectedIds((prev) => prev.filter((id) => !deletedIds.includes(id)));
      }

      if (failedFiles.length === 0) {
        setSuccess(
          deletedIds.length === 1
            ? "File deleted successfully."
            : `${deletedIds.length} files deleted successfully.`,
        );
      } else if (deletedIds.length === 0) {
        const firstReason = failedFiles[0]?.reason;
        setError(firstReason || "Failed to delete selected file(s).");
      } else {
        setSuccess(`${deletedIds.length} file(s) deleted successfully.`);
        const firstReason = failedFiles[0]?.reason;
        setError(
          firstReason
            ? `${failedFiles.length} file(s) failed. First error: ${firstReason}`
            : `${failedFiles.length} file(s) failed to delete.`,
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete selected file(s).",
      );
    } finally {
      setIsDeleting(false);
      setDeleteTargetIds([]);
    }
  };

  return (
    <div className="px-4 pt-2 pb-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-base-content">
          <SiCloudinary size={22} className="text-primary inline mr-2 mb-0.5" />
          Cloudinary Files
        </h2>
        <button
          className="btn btn-error btn-sm"
          onClick={askDeleteSelected}
          disabled={!selectedCount || isDeleting}
        >
          {isDeleting ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <FiTrash2 size={15} />
          )}
          Delete Selected ({selectedCount})
        </button>
      </div>

      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success text-sm py-2">
          <span>{success}</span>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  disabled={!files.length || loading}
                />
              </th>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Dimensions</th>
              <th>Size</th>
              <th>URL</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            )}

            {!loading && files.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-8 text-base-content/50 text-sm"
                >
                  No files found.
                </td>
              </tr>
            )}

            {!loading &&
              files.map((file, index) => {
                const checked = selectedIds.includes(file.id);
                return (
                  <tr key={file.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={checked}
                        onChange={() => toggleSelectOne(file.id)}
                      />
                    </td>
                    <th>{index + 1}</th>
                    <td className="font-medium">{file.name || "-"}</td>
                    <td>
                      <span className="badge badge-ghost gap-1">
                        <FiImage size={12} />
                        {file.resource_type || "unknown"}
                      </span>
                    </td>
                    <td className="text-sm text-base-content/70">
                      {file.width && file.height
                        ? `${file.width} x ${file.height}`
                        : "-"}
                    </td>
                    <td className="text-sm text-base-content/70">
                      {formatBytes(file.bytes)}
                    </td>
                    <td>
                      {file.secure_url ? (
                        <a
                          href={file.secure_url}
                          target="_blank"
                          rel="noreferrer"
                          className="link link-primary text-sm break-all"
                        >
                          {file.public_id || file.secure_url}
                        </a>
                      ) : (
                        <span className="text-sm text-base-content/50">-</span>
                      )}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn btn-ghost btn-sm text-info"
                          onClick={() => openPreview(file)}
                          disabled={!isPreviewable(file)}
                          title={
                            isPreviewable(file)
                              ? "Preview"
                              : "Preview is only supported for image/video files"
                          }
                        >
                          <FiEye size={15} />
                        </button>
                        <button
                          className="btn btn-ghost btn-sm text-error"
                          onClick={() => askDeleteSingle(file.id)}
                          disabled={isDeleting}
                          title="Delete"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className={`modal ${deleteTargetIds.length ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            {deleteTargetIds.length === 1
              ? "Are you sure you want to delete this file? This action cannot be undone."
              : `Are you sure you want to delete ${deleteTargetIds.length} files? This action cannot be undone.`}
          </p>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={closeDeleteModal}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={previewDialogRef}
        className="modal"
        onClose={() => setPreviewFile(null)}
      >
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-lg mb-3">Preview</h3>
          {previewFile?.resource_type === "video" ? (
            <video
              src={previewFile?.secure_url}
              controls
              className="w-full rounded-lg border border-base-300"
            />
          ) : (
            <img
              src={previewFile?.secure_url}
              alt={previewFile?.name || "Cloudinary file"}
              className="w-full rounded-lg border border-base-300"
            />
          )}
          <div className="modal-action">
            <button className="btn" onClick={closePreview}>
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FilesList;
