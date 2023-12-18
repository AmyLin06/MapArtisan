import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Papa from "papaparse";
import ChoroplethLegend, { choroplethLegend } from "../ChoroplethLegend";
import { EditMapContext } from "../../store/EditMapStore";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import storage from "../../firebaseConfig";

const ChoroplethForm = () => {
  const navigate = useNavigate();
  const { editStore } = useContext(EditMapContext);
  const [uploadedGeoJsonFile, setUploadedGeoJsonFile] = useState();
  const [uploadedDataFile, setUploadedDataFile] = useState();
  const [updatedGeoJsonFile, setUpdatedGeoJsonFile] = useState();
  const [open, setOpen] = useState(
    editStore.currentModal === "CREATE_CHOROPLETH_FORM"
  );
  const [geoFile, setGeoFile] = useState();
  const [csvFile, setCsvFile] = useState();
  const [polygonLabel, setPolygonLabel] = useState();
  const [geoLabel, setGeoLabel] = useState();
  const [csvLabel, setCsvLabel] = useState();
  const [lowerBound, setLowerBound] = useState();
  const [upperBound, setUpperBound] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [colorList, setColorList] = useState([]);

  function readJsonFile(event) {
    event.preventDefault();
    setUploadedGeoJsonFile(undefined);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const text = JSON.parse(event.target.result);
      if (text && text.features) {
        // Loop through the features array and rename the column
        text.features.forEach((feature) => {
          if (feature.properties && feature.properties[polygonLabel]) {
            feature.properties["indexColumn"] =
              feature.properties[polygonLabel];
            delete feature.properties[polygonLabel];
          }
        });
      }
      setUploadedGeoJsonFile(text);
      readDataFile(csvFile, text.features);
      console.log(text);
    };
    fileReader.readAsText(event.target.files[0]);
    console.log(editStore.currentTemplate);
  }

  function readDataFile(event, features) {
    event.preventDefault();
    setUploadedDataFile(undefined);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const text = event.target.result;
      const data = Papa.parse(text, {
        header: true,
        complete: (result) => {
          console.log(result.meta.fields);
          if (result.meta.fields.includes(polygonLabel)) {
            result.data.forEach((row) => {
              row.indexColumn = row.polygonLabel;
              delete row.polygonName;
            });
          }
          processData(result.data, features);
          console.log(result);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
      setUploadedDataFile(data);
    };

    fileReader.readAsText(event.target.files[0]);
    console.log(editStore.currentTemplate);
  }

  const processData = (processingData, features) => {
    setUpdatedGeoJsonFile(undefined);
    // const features = uploadedGeoJsonFile.features;
    for (let i = 0; i < features.length; i++) {
      const polygon = features[i];
      const polygonInfo = processingData.find(
        (polygonInfo) => polygon.properties[geoLabel] === polygonInfo[csvLabel]
      );
      polygon.properties.stat = 0;
      polygon.properties.statTxt = "0";

      if (polygonInfo != null) {
        const stat = polygonInfo["Birth rate"];
        polygon.properties.stat = stat;
        polygon.properties.statTxt = formatString(stat);
      }
      setColor(polygon);
    }
    console.log(editStore.currentTemplate);

    setUpdatedGeoJsonFile(features);
    const list = choroplethLegend(upperBound, lowerBound, colorList);
    uploadToFirebase(features, "ChoroplethMap");
    // editStore.addLayer("Choropleth Template", features, "CHOROPLETH");
  };

  const setColor = (polygon) => {
    const list = choroplethLegend(upperBound, lowerBound, colorList);
    const tile = list.find((tile) => tile.isfor(polygon.properties.stat));
    if (tile != null) {
      polygon.properties.color = tile.color;
    }
  };

  const formatString = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleUploadGeoJSON = (event) => {
    setGeoFile(event);
  };

  const handleUploadData = (event) => {
    setCsvFile(event);
  };

  const handlePolygonName = (event) => {
    event.stopPropagation();
    setPolygonLabel(event.target.value);
  };
  const handleGeoLabel = (event) => {
    event.stopPropagation();
    setGeoLabel(event.target.value);
  };

  const handleDataLabel = (event) => {
    event.stopPropagation();
    setCsvLabel(event.target.value);
  };

  const handleUpperBound = (event) => {
    event.stopPropagation();
    setUpperBound(event.target.value);
  };

  const handleLowerBound = (event) => {
    event.stopPropagation();
    setLowerBound(event.target.value);
  };

  const handleTile1 = (event) => {
    event.stopPropagation();
    colorList[0] = event.target.value;
    // setColorList(colorList.push({ T1: event.target.value }));
  };

  const handleTile2 = (event) => {
    event.stopPropagation();
    colorList[1] = event.target.value;

    // setColorList(colorList.push({ T2: event.target.value }));
  };

  const handleTile3 = (event) => {
    event.stopPropagation();
    colorList[2] = event.target.value;

    // setColorList(colorList.push({ T3: event.target.value }));
  };

  const handleTile4 = (event) => {
    event.stopPropagation();
    colorList[3] = event.target.value;

    // setColorList(colorList.push({ T4: event.target.value }));
  };

  const handleTile5 = (event) => {
    event.stopPropagation();
    colorList[4] = event.target.value;

    // setColorList(colorList.push({ T5: event.target.value }));
  };

  const handleClose = () => {
    editStore.hideModals();
    editStore.closeMap();
    navigate("/home");
    setOpen(false);
  };

  const handleSubmit = () => {
    if (
      !geoFile ||
      !csvFile ||
      !geoLabel ||
      !csvLabel ||
      !lowerBound ||
      !upperBound ||
      colorList.includes(null)
    ) {
      setErrorMessage(
        <div
          style={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          You must enter all required fields
        </div>
      );
    } else {
      setErrorMessage("");
      setColorList(colorList);
      editStore.hideModals();
      setOpen(false);
      readJsonFile(geoFile);
    }
  };

  const uploadToFirebase = (data, fileName) => {
    const storageRef = ref(
      storage,
      `/geo-json-datas/map-id-${editStore.currentMapMetaData._id}/${fileName}`
    );
    uploadString(storageRef, JSON.stringify(data), "raw", {
      contentType: "application/json",
    })
      .then((snapshot) => {
        console.log("Upload complete.");
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        editStore.addLayer(fileName, url);
      })
      .catch((error) => {
        console.error("Error uploading", error);
      });
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create your own Choropleth map</DialogTitle>
        <DialogContent>
          {errorMessage}
          <DialogContentText>
            Uploaded a GeoJSON file and a CSV file:
          </DialogContentText>
          <div style={{ display: "flex", size: 10 }}>
            <DialogContentText sx={{ fontSize: 14 }}>
              GeoJSON:
            </DialogContentText>
            <label htmlFor="geoJsonInput"></label>
            <input
              type="file"
              accept=".json"
              id="geoJsonInput"
              onChange={(event) => {
                handleUploadGeoJSON(event);
              }}
            />
            <DialogContentText sx={{ fontSize: 14 }}>CSV: </DialogContentText>
            <input
              type="file"
              accept=".csv"
              id="dataInput"
              onChange={(event) => {
                handleUploadData(event);
              }}
            />
          </div>

          <DialogContentText>Enter the Identifiers:</DialogContentText>
          <TextField
            autoFocus
            id="Identifier"
            label="Label (Polygons)"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            onChange={handlePolygonName}
          />
          <TextField
            autoFocus
            id="Identifier"
            label="Label (GeoJSON)"
            size="small"
            required
            sx={{ m: 1, width: "21ch" }}
            onChange={handleGeoLabel}
          />
          <TextField
            autoFocus
            margin="none"
            id="Identifier"
            label="Label (CSV)"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            onChange={handleDataLabel}
          />
          <DialogContentText>Enter the statistic range:</DialogContentText>
          <TextField
            label="From"
            id="From"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">From</InputAdornment>
              ),
            }}
            onChange={handleLowerBound}
          />
          <TextField
            label="To"
            id="To"
            size="small"
            required
            sx={{ m: 1, width: "20ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">To</InputAdornment>
              ),
            }}
            onChange={handleUpperBound}
          />
          <DialogContentText>Enter the tile colors:</DialogContentText>

          <TextField
            label="Tile 1"
            id="c1"
            size="small"
            required
            sx={{ m: 1, width: "12ch" }}
            onChange={handleTile1}
          />
          <TextField
            label="Tile 2"
            id="c2"
            size="small"
            required
            sx={{ m: 1, width: "12ch" }}
            onChange={handleTile2}
          />
          <TextField
            label="Tile 3"
            id="c3"
            size="small"
            required
            sx={{ m: 1, width: "12ch" }}
            onChange={handleTile3}
          />
          <TextField
            label="Tile 4"
            id="c4"
            size="small"
            required
            sx={{ m: 1, width: "12ch" }}
            onChange={handleTile4}
          />
          <TextField
            label="Tile 5"
            id="c5"
            size="small"
            required
            sx={{ m: 1, width: "12ch", marginRight: -1 }}
            onChange={handleTile5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ChoroplethForm;
