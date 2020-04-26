import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';

function ChatTeamSidebarTop() {
  return (
    <div className="chat-team-sidebar-top">
      <h5 className="mb-1 text-center">Students</h5>
      <button type="button" className="">
        Add Student
      </button>
    </div>
  );
}

function ChatTeamSidebarBottom() {
  const [students, setStudents] = React.useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="chat-team-sidebar-bottom">
      <form className="px-3 mb-3" />
      <div className="list-group list-group-flush">
        {students.map((student, i) => (
          <a className="list-group-item list-group-item-action" key={i}>
            <div className="media media-member mb-0">
              <div className="media-body">
                <h6 className="mb-0">Claire Connors</h6>
                <span className="SPAN-filter-by-text">Administrator</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar collapse">
      <div className="sidebar-content">
        <div className="chat-team-sidebar text-small">
          <ChatTeamSidebarTop />
          <ChatTeamSidebarBottom />
        </div>
      </div>
    </div>
  );
}
