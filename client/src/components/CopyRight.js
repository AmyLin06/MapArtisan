import Link from "@mui/material/Link";
import "../styles/CopyRight.css";
const CopyRight = (props) => {
  return (
    <div className="copyRight">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://calm-meadow-021492f0f.4.azurestaticapps.net/"
      >
        Map Artisan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
};

export default CopyRight;
