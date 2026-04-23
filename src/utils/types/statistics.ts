export interface AppointmentRow {
  _id: string;
  scheduled_at: string;
  created_at: string;
  appointment_status: "SCHEDULED" | "COMPLETED";
  payment_status: "CONFIRMED" | "PENDING";
  meet_link?: string;
  user_id: { _id: string; name: string; email: string };
  therapist_id: { _id: string; name: string; specialization?: string; profile_photo?: string };
}

export interface TopTherapist {
  therapist_id: string;
  name: string;
  specialization?: string;
  profile_photo?: string;
  appointment_count: number;
  completed_count: number;
  avg_feedback: number | null;
}

export interface SubscribedUserRow {
  _id: string;
  status: "active" | "paused" | "cancelled" | "expired" | "pending";
  date_bought: string;
  expiry_date?: string;
  user_id: { _id: string; name: string; email: string };
  package_id: { _id: string; name: string };
}

export interface MonthlyAppointmentPoint {
  date: string;
  count: number;
}

export interface MonthlyStats {
  total: number;
  daily: MonthlyAppointmentPoint[];
}
