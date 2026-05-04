import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router";

import { useState, useEffect } from "react";

function NavHeader (props) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if(darkMode)
      document.documentElement.setAttribute("data-bs-theme", "dark");
    else
      document.documentElement.removeAttribute("data-bs-theme");
  }, [darkMode]);

  return(
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Link to="/" className="navbar-brand">HeapOverrun</Link>
        <Button onClick={() => setDarkMode(oldMode => !oldMode)}> 
          {darkMode ? <i className=" bi bi-sun-fill"></i> : <i className=" bi bi-moon-fill"></i>}
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavHeader;