import { ConnectOptions } from 'mongoose';

// Shared between the module bootstrap and the reconnect middleware so a
// re-opened connection behaves identically to the original one.
export const MONGO_CONNECT_OPTIONS: ConnectOptions = {
  // Cold M0 clusters can be slow to accept the first TLS handshake; a
  // window that is too tight condemns the container's first connect.
  serverSelectionTimeoutMS: 8000,
  // Small pool so parallel warm containers don't exhaust the Atlas M0
  // connection cap.
  maxPoolSize: 5,
  minPoolSize: 0,
};
