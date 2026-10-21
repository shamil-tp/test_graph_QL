import { useState } from 'react';
// import { useQuery, useMutation, gql } from '@apollo/client';
// import { useQuery, useMutation, gql } from '@apollo/client/index.js';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';

// GraphQL Queries and Mutations
const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      name
      isHosteler
      mark
      course
    }
  }
`;

const ADD_STUDENT = gql`
  mutation AddStudent($name: String!, $isHosteler: Boolean!, $mark: Float!, $course: String!) {
    addStudent(name: $name, isHosteler: $isHosteler, mark: $mark, course: $course) {
      id
      name
      isHosteler
      mark
      course
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  const [addStudent, { loading: adding }] = useMutation(ADD_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const [form, setForm] = useState({
    name: '',
    course: '',
    mark: '',
    isHosteler: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.course || !form.mark) return;

    addStudent({
      variables: {
        name: form.name,
        course: form.course,
        mark: parseFloat(form.mark),
        isHosteler: form.isHosteler,
      },
    });

    setForm({ name: '', course: '', mark: '', isHosteler: false });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>Student Management</h1>

      {/* Add Student Form */}
      <section style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Add New Student</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Student Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <input
            type="text"
            placeholder="Course"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Mark"
            value={form.mark}
            onChange={(e) => setForm({ ...form, mark: e.target.value })}
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.isHosteler}
              onChange={(e) => setForm({ ...form, isHosteler: e.target.checked })}
            />
            Is Hosteler
          </label>
          <button
            type="submit"
            disabled={adding}
            style={{
              padding: '10px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {adding ? 'Saving...' : 'Add Student'}
          </button>
        </form>
      </section>

      {/* Student List */}
      <section>
        <h3>Registered Students</h3>
        {loading && <p>Loading students...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

        {data && data.students.length === 0 && <p>No students found.</p>}

        {data && data.students.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.students.map((student) => (
              <li
                key={student.id}
                style={{
                  borderBottom: '1px solid #ddd',
                  padding: '12px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong>{student.name}</strong> ({student.course})
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    Type: {student.isHosteler ? 'Hosteler' : 'Day Scholar'}
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#0070f3' }}>
                  {student.mark} / 100
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}