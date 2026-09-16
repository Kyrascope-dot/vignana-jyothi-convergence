import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRE_SQL_URI,
});

const SEED_EVENTS = [
  {
    event_id: "ev_101",
    event_name: "Coding Contest",
    description:
      "Put your skills to test with our algorithmic challenges.",
    category: "Technical",
    venue: "E001",
    prize_pool: 5000,
    registration_deadline: "2026-08-28T13:30:00Z",
    start_time: "2026-08-28T14:30:00Z",
    end_time: "2026-08-28T16:30:00Z",
    contact: ["+91 9100000000", "+91 9200000000"],
    participant_limit: 100,
  },
  {
    event_id: "ev_102",
    event_name: "Robo Wars",
    description: "Battle of custom-built combat robots.",
    category: "Technical",
    venue: "Open Auditorium",
    prize_pool: 15000,
    registration_deadline: "2026-08-28T12:00:00Z",
    start_time: "2026-08-28T15:00:00Z",
    end_time: "2026-08-28T18:00:00Z",
    contact: ["+91 9300000000"],
    participant_limit: 30,
  },
];

export const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        institution VARCHAR(255),
        roll_number VARCHAR(50),
        year VARCHAR(10),
        branch VARCHAR(100),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'attendee',
        pass_status VARCHAR(50) DEFAULT 'inactive',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        event_id VARCHAR(50) PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        venue VARCHAR(255),
        prize_pool INTEGER DEFAULT 0,
        registration_deadline TIMESTAMPTZ,
        start_time TIMESTAMPTZ,
        end_time TIMESTAMPTZ,
        contact TEXT[],
        participant_limit INTEGER,
        status VARCHAR(50) DEFAULT 'active'
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(user_id),
        event_id VARCHAR(50) REFERENCES events(event_id),
        registered_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, event_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(user_id),
        pass_type VARCHAR(100),
        amount INTEGER,
        currency VARCHAR(10) DEFAULT 'INR',
        razorpay_order_id VARCHAR(255) UNIQUE,
        razorpay_payment_id VARCHAR(255),
        razorpay_signature TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        paid_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    for (const event of SEED_EVENTS) {
      await client.query(
        `INSERT INTO events (event_id, event_name, description, category, venue, prize_pool, registration_deadline, start_time, end_time, contact, participant_limit)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (event_id) DO NOTHING`,
        [
          event.event_id,
          event.event_name,
          event.description,
          event.category,
          event.venue,
          event.prize_pool,
          event.registration_deadline,
          event.start_time,
          event.end_time,
          event.contact,
          event.participant_limit,
        ]
      );
    }

    await client.query("COMMIT");
    console.log("Database initialized successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database initialization failed:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

export const getAllEvents = async () => {
  const query = `
    SELECT
      event_id AS "eventId",
      event_name AS "name",
      description,
      category,
      venue,
      prize_pool,
      registration_deadline,
      start_time,
      end_time,
      contact,
      participant_limit AS "participantLimit"
    FROM events
    WHERE status != 'archived';
  `;
  const res = await pool.query(query);
  return res.rows;
};

export const getUserRegistrations = async (userId) => {
  const query = `SELECT event_id AS "eventId" FROM registrations WHERE user_id = $1`;
  const res = await pool.query(query, [userId]);
  return res.rows;
};

export const findUserByEmail = async (email) => {
  const query = `
    SELECT
      user_id AS "id",
      name,
      email,
      phone,
      institution AS "college",
      roll_number AS "rollNumber",
      year,
      branch,
      password,
      role,
      pass_status AS "passStatus"
    FROM users
    WHERE email = $1
  `;
  const res = await pool.query(query, [email]);
  return res.rows[0];
};

export const createUser = async (userData) => {
  const query = `
    INSERT INTO users (user_id, name, email, phone, institution, roll_number, year, branch, password, role, pass_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'attendee', 'inactive')
    RETURNING
      user_id AS "id",
      name,
      email,
      phone,
      institution AS "college",
      roll_number AS "rollNumber",
      year,
      branch,
      role,
      pass_status AS "passStatus"
  `;
  const values = [
    `usr_${Date.now()}`,
    userData.name,
    userData.email,
    userData.phone,
    userData.college,
    userData.rollNumber,
    userData.year,
    userData.branch,
    userData.password,
  ];
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const insertPayment = async (paymentData) => {
  const query = `
    INSERT INTO payments (user_id, pass_type, amount, currency, razorpay_order_id, razorpay_payment_id, razorpay_signature, status, paid_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING
      id,
      user_id AS "userId",
      pass_type AS "passType",
      amount,
      currency,
      razorpay_order_id AS "razorpayOrderId",
      razorpay_payment_id AS "razorpayPaymentId",
      razorpay_signature AS "razorpaySignature",
      status,
      paid_at AS "paidAt",
      created_at AS "createdAt"
  `;
  const values = [
    paymentData.userId,
    paymentData.passType,
    paymentData.amount,
    paymentData.currency,
    paymentData.razorpayOrderId,
    paymentData.razorpayPaymentId,
    paymentData.razorpaySignature,
    paymentData.status,
    paymentData.paidAt,
  ];
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const getPaymentByOrderId = async (orderId) => {
  const query = `
    SELECT
      id,
      user_id AS "userId",
      pass_type AS "passType",
      amount,
      currency,
      razorpay_order_id AS "razorpayOrderId",
      razorpay_payment_id AS "razorpayPaymentId",
      razorpay_signature AS "razorpaySignature",
      status,
      paid_at AS "paidAt",
      created_at AS "createdAt"
    FROM payments
    WHERE razorpay_order_id = $1
  `;
  const res = await pool.query(query, [orderId]);
  return res.rows[0] || null;
};

export const updateUserPassStatus = async (userId, status) => {
  const query = `
    UPDATE users SET pass_status = $1 WHERE user_id = $2
    RETURNING
      user_id AS "id",
      name,
      email,
      role,
      pass_status AS "passStatus"
  `;
  const res = await pool.query(query, [status, userId]);
  return res.rows[0] || null;
};
