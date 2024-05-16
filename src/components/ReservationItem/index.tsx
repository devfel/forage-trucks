import React, { useState } from "react";
import Modal from "../Modal";

import "./styles.css";

export interface Reservation {
  id: number;
  date: number;
  staff: string;
  created_at: string;
  vehicle_id: number;
  name: string;
  avatar: string;
  bio: string;
  period: string;
}

interface ReservationItemProps extends Reservation {
  onDelete: (id: number) => void;
}

const ReservationItem: React.FunctionComponent<ReservationItemProps> = ({ id, date, staff, created_at, vehicle_id, period, name, avatar, bio, onDelete }) => {
  const dReserved = new Date(+date).toUTCString().split(" ").slice(0, 4).join(" ");
  const dCreated = new Date(created_at).toLocaleString();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // Convert bytes to hex string

    const storedHash = "694d4f482f2a9ae1f64d1201f39ce86e1505137379236b5f99dc167e730c582a"; // Hash for "password"

    if (hashHex === storedHash) {
      onDelete(id);
      setShowModal(false);
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <article className="reservation-item">
      <div className="reservation-header">
        <button className="delete-btn" onClick={() => setShowModal(true)}>
          X
        </button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h2>Confirm Deletion</h2>
          <input className="input-password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="confirm-btn" onClick={handleDelete}>
            Delete Reservation
          </button>
        </Modal>
        <div className="text-information">
          <header>
            <strong>{staff}</strong>
            <span>
              <b>Date: {dReserved}</b>
            </span>
            <span>
              <b>Period: {period}</b>
            </span>
            <span>Reservation Created at: {dCreated} GMT</span>
          </header>

          <p>Vehicle Name: {name}</p>
          <p>Vehicle Description: {bio}</p>
        </div>
      </div>

      <img src={`/forage-trucks/images/${avatar}.jpg`} alt={name} />
    </article>
  );
};

export default ReservationItem;
