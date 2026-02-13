import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Napaka pri pridobivanju podatkov");
        }
        const data = await response.json();

        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <h2>Nalaganje...</h2>;
  }

  if (error) {
    return <h2>Napaka: {error}</h2>;
  }
  return (
    <div className="container">
      <h1>Uporabniki</h1>
      {users.map((user) => (
        <div key={user.id} className="card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
