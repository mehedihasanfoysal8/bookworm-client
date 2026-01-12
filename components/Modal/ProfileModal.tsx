"use client";

import { useState } from "react";
import { updateMyProfile } from "@/services/user.service";
import { useAuth } from "@/context/AuthContext";
import { uploadImageToImageBB } from "@/utils/uploadIMage";
import { X } from "lucide-react";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let photoUrl = user?.photo;

      if (file) {
        photoUrl = await uploadImageToImageBB(file);
      }

      await updateMyProfile({ name, photo: photoUrl });
      await refreshUser();
      onClose();
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Name"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
