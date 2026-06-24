/** @typedef {{ id: string; name: string; email: string }} User */

/** @type {User[]} */
const users = [
  { id: "1", name: "Ana García", email: "ana@example.com" },
  { id: "2", name: "Bruno López", email: "bruno@example.com" },
];

/**
 * BUG SEMILLA #1: no valida usuario inexistente → TypeError en runtime.
 * Contrato correcto: ver docs/api-contract.md
 * @param {string} id
 */
export function getUserDisplayName(id) {
  const user = users.find((u) => u.id === id);
  return user.name.toUpperCase();
}

/** @param {string} id */
export function getUser(id) {
  return users.find((u) => u.id === id);
}

export function listUsers() {
  return users;
}
