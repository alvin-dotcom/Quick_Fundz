import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("User not authenticated");
        const { data: notificationsData, error: notificationsError } =
          await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", user.id);

        if (notificationsError) throw notificationsError;

        setNotifications(notificationsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (notificationId) => {
    await supabase
      .from("notifications")
      .update({ status: "accepted" })
      .eq("id", notificationId);
    setNotifications(notifications.filter((n) => n.id !== notificationId));
  };

  const handleReject = async (notificationId, reason) => {
    await supabase
      .from("notifications")
      .update({ status: "rejected", rejection_reason: reason })
      .eq("id", notificationId);
    setNotifications(notifications.filter((n) => n.id !== notificationId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.id} className="border p-4 mb-4">
            <p>{notification.message}</p>
            {notification.status === "unread" && (
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleAccept(notification.id)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    const reason = prompt("Reason for rejection:");
                    if (reason) handleReject(notification.id, reason);
                  }}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
            {notification.status === "rejected" && (
              <p className="text-red-500 mt-2">
                Rejected: {notification.rejection_reason}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
