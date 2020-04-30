import React, { useState, useContext, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ThreadContext } from './Threads';
import http from '../http';
import types from './actionTypes';

function ChatTeamSidebarTop({ toggleModal }) {
  return (
    <div className="chat-team-sidebar-top">
      <h5 className="mb-1 text-center">Students</h5>
      <button
        onClick={toggleModal}
        type="button"
        className="btn btn-primary btn-block"
      >
        Invite Student
      </button>
    </div>
  );
}

// Add this later
function FilterStudentsForm() {
  return (
    <form className="px-3 mb-3">
      <div className="input-group input-group-round">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="material-icons">filter_list</i>
          </span>
        </div>
        <input
          type="search"
          className="form-control filter-list-input"
          placeholder="Filter members"
          aria-label="Filter Members"
          aria-describedby="filter-members"
        />
      </div>
    </form>
  )
}

function ChatTeamSidebarBottom() {
  const { students, dispatch } = useContext(ThreadContext);

  if (students.length === 0) {
    return <p className="text-center">No Students Yet!</p>;
  }

  return (
    <div className="chat-team-sidebar-bottom">
      {/* <FilterStudentsForm /> */}
      <div className="list-group list-group-flush">
        {students.map((student) => (
          <button
            type="button"
            className="list-group-item list-group-item-action"
            key={student.id}
            onClick={() => {
              console.log('clicked', student.id)
              dispatch({ type: types.setActiveThreadForStudent, student })
            }}
          >
            <div className="media media-member mb-0">
              <div className="media-body">
                <h6 className="mb-0">{student.name}</h6>
                <span>{student.friendly_phone_number}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  const { course, students, dispatch } = useContext(ThreadContext);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await http.post('/students', {
        name,
        number,
        courseId: course.id,
      });

      dispatch({ type: types.addStudent, student: data })

      toggleModal();
      setName('');
      setNumber('');
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const closeBtn = (
    <button
      onClick={() => setModal(false)}
      type="button"
      className="close btn btn-round"
      aria-label="Close"
    >
      <i className="material-icons">close</i>
    </button>
  );
  return (
    <div className="sidebar collapse">
      <div className="sidebar-content">
        <div className="chat-team-sidebar text-small">
          <ChatTeamSidebarTop toggleModal={toggleModal} />
          <ChatTeamSidebarBottom />
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader close={closeBtn} toggle={toggleModal}>
          Invite Student
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Student Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Phone Number</label>
              <input
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                id="number"
                name="number"
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              Submit Form
            </button>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={toggleModal}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default React.memo(Sidebar)
