import { AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            children={"Learn With Me"}
            fontWeight={900}
            letterSpacing={"10px"}
            variant="h4"
            mr={"auto"}
            textTransform={"uppercase"}
          />
          <NavLink to={"/"}>Home</NavLink>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
