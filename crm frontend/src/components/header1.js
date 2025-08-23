import { Link } from 'react-router-dom';
import '../css/mystyle.css';
import 'react-router-dom';
import { useState } from 'react';
import { useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import lead from '../icons/lead.jpg'
import deal from '../icons/deal.jpg'
import project from '../icons/project.jpg'


function Header1() {

	const menuRef = useRef(null);
	const buttonRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
  
	// Function to toggle the menu
	const handleToggleMenu = (event) => {
	  event.stopPropagation(); // Prevent immediate closure
	  setIsOpen((prev) => !prev);
	};
  
	// Close menu when clicking outside
	useEffect(() => {
	  const handleClickOutside = (event) => {
		if (
		  menuRef.current &&
		  !menuRef.current.contains(event.target) &&
		  buttonRef.current &&
		  !buttonRef.current.contains(event.target)
		) {
		  setIsOpen(false);
		}
	  };
  
	  document.addEventListener("click", handleClickOutside);
	  return () => {
		document.removeEventListener("click", handleClickOutside);
	  };
	}, []);
	
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	  
    return ( 
        <div>
            <div class="header" style={{width:"100%",borderRadius:"5px",height:"50px",padding:"10px"}}>
			<div className="header-left">
      {/* Add Button */}
      <button
        ref={buttonRef}
        className="dropdown-toggle"
        onClick={handleToggleMenu}
        style={{
          marginLeft: "10%",
          border: "none",
          backgroundColor: "transparent",
          position: "absolute",
          zIndex: 10,
        }}
      >
        Add
      </button>

      {/* Dropdown Menu */}
      <div className="topnav">
        {isOpen && (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              background: "white",
              borderRadius: "5px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              zIndex: 9999,
              padding: "5px",
			  marginLeft:"60px",
			  marginTop:"15px",
			  
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1",}}>
              <li>
                <Link to={"/addcontact"} className="dropdown-item">
                  <img
                    src="https://icons.veryicon.com/png/o/object/life-icon-8/add-a-contact-4.png"
                    style={{ height: "15px", marginRight: "10px" }}
                    alt="Contact"
                  />
                  Contact
                </Link>
              </li>
              <li>
                <Link to={"/addcompany"} className="dropdown-item">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0YDoMUcwmWBpTsarrB_1BqT54AR0xldyQ3Q&s"
                    style={{ height: "15px", marginRight: "10px" }}
                    alt="Add Company"
                  />
                  Add Company
                </Link>
              </li>
              <li>
                <Link to={"/leadinfo"} className="dropdown-item">
                  <img src={lead} style={{ height: "15px", marginRight: "10px" }} alt="Lead" />
                  Lead
                </Link>
              </li>
              <li>
                <Link to={"/project"} className="dropdown-item">
                  <img src={project} style={{ height: "15px", marginRight: "10px" }} alt="Project" />
                  Project
                </Link>
              </li>
              <li>
                <Link to={"/deal"} className="dropdown-item">
                  <img src={deal} style={{ height: "15px", marginRight: "10px" }} alt="Deal" />
                  Deal
                </Link>
              </li>
              <li>
                <Link to={"/tasksform"} className="dropdown-item">
                  <img
                    src="https://static.thenounproject.com/png/396666-200.png"
                    style={{ height: "15px", marginRight: "10px" }}
                    alt="Add Tasks"
                  />
                  Add Tasks
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
		<div class="header-right" style={{marginTop:"-10px"}}>
			<div class="user-info-dropdown">
				<div class="dropdown">
					<a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" style={{paddingRight:"40px"}}>
					
						<span class="user-name">Admin</span>
					</a>
					<div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
						<a class="dropdown-item" href="profile.html"><i class="dw dw-user1"></i> Profile</a>
						<a class="dropdown-item" href="profile.html"><i class="dw dw-settings2"></i> Setting</a>
						<a class="dropdown-item" href="faq.html"><i class="dw dw-help"></i> Help</a>
						<a class="dropdown-item" href="login.html"><i class="dw dw-logout"></i> Log Out</a>
					</div>
				</div>
			</div>
			
		</div>
	</div>

	<div class="right-sidebar">
		<div class="sidebar-title">
			<h3 class="weight-600 font-16 text-blue">
				Layout Settings
				<span class="btn-block font-weight-400 font-12">User Interface Settings</span>
			</h3>
			<div class="close-sidebar" data-toggle="right-sidebar-close">
				<i class="icon-copy ion-close-round"></i>
			</div>
		</div>
		<div class="right-sidebar-body customscroll">
			<div class="right-sidebar-body-content">
				<h4 class="weight-600 font-18 pb-10">Header Background</h4>
				<div class="sidebar-btn-group pb-30 mb-10">
					<a href="javascript:void(0);" class="btn btn-outline-primary header-white active">White</a>
					<a href="javascript:void(0);" class="btn btn-outline-primary header-dark">Dark</a>
				</div>

				<h4 class="weight-600 font-18 pb-10">Sidebar Background</h4>
				<div class="sidebar-btn-group pb-30 mb-10">
					<a href="javascript:void(0);" class="btn btn-outline-primary sidebar-light ">White</a>
					<a href="javascript:void(0);" class="btn btn-outline-primary sidebar-dark active">Dark</a>
				</div>

				<h4 class="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
				<div class="sidebar-radio-group pb-10 mb-10">
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-1" name="menu-dropdown-icon" class="custom-control-input" value="icon-style-1" checked=""/>
						<label class="custom-control-label" for="sidebaricon-1"><i class="fa fa-angle-down"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-2" name="menu-dropdown-icon" class="custom-control-input" value="icon-style-2"/>
						<label class="custom-control-label" for="sidebaricon-2"><i class="ion-plus-round"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebaricon-3" name="menu-dropdown-icon" class="custom-control-input" value="icon-style-3"/>
						<label class="custom-control-label" for="sidebaricon-3"><i class="fa fa-angle-double-right"></i></label>
					</div>
				</div>

				<h4 class="weight-600 font-18 pb-10">Menu List Icon</h4>
				<div class="sidebar-radio-group pb-30 mb-10">
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-1" name="menu-list-icon" class="custom-control-input" value="icon-list-style-1" checked=""/>
						<label class="custom-control-label" for="sidebariconlist-1"><i class="ion-minus-round"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-2" name="menu-list-icon" class="custom-control-input" value="icon-list-style-2"/>
						<label class="custom-control-label" for="sidebariconlist-2"><i class="fa fa-circle-o" aria-hidden="true"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-3" name="menu-list-icon" class="custom-control-input" value="icon-list-style-3"/>
						<label class="custom-control-label" for="sidebariconlist-3"><i class="dw dw-check"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-4" name="menu-list-icon" class="custom-control-input" value="icon-list-style-4" checked=""/>
						<label class="custom-control-label" for="sidebariconlist-4"><i class="icon-copy dw dw-next-2"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-5" name="menu-list-icon" class="custom-control-input" value="icon-list-style-5"/>
						<label class="custom-control-label" for="sidebariconlist-5"><i class="dw dw-fast-forward-1"></i></label>
					</div>
					<div class="custom-control custom-radio custom-control-inline">
						<input type="radio" id="sidebariconlist-6" name="menu-list-icon" class="custom-control-input" value="icon-list-style-6"/>
						<label class="custom-control-label" for="sidebariconlist-6"><i class="dw dw-next"></i></label>
					</div>
				</div>

				<div class="reset-options pt-30 text-center">
					<button class="btn btn-danger" id="reset-settings">Reset Settings</button>
				</div>
			</div>
		</div>
	</div>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!
			<h2>hello world</h2>
		</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
        </div>
     );
}

export default Header1;