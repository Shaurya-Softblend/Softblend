import React, { useRef } from "react";
import Plot from "react-plotly.js";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

function Graph() {
  const xvalue = [
    "2024-01-01T00:01:00",
    "2024-01-01T00:02:00",
    "2024-01-01T00:03:00",
    "2024-01-01T00:04:00",
    "2024-01-01T00:05:00",
    "2024-01-01T00:06:00",
    "2024-01-01T00:07:00",
    "2024-01-01T00:08:00",
  ];
  const yValues = {
    FC270022_DACA_PV_KPI_3: [
      41347.36328125, 41339.5625, 41411.9765625, 41411.3984375, 41436.03125,
      41476.171875, 41443.1796875, 41385.3515625,
    ],
    FC270023_DACA_PV_KPI_3: [
      41380.08203125, 41326.3203125, 41412.39453125, 41403.56640625,
      41433.66796875, 41329.4375, 41470.109375, 41401.1171875,
    ],
    FC270024_DACA_PV_KPI_3: [
      41402.52734375, 41490.24609375, 41490.6015625, 41512.9140625,
      41438.47265625, 41401.23046875, 41406.91015625, 41407.32421875,
    ],
    FC270025_DACA_PV_KPI_3: [
      41416.96875, 41427.34375, 41396.51953125, 41424.09765625, 41466.69921875,
      41442.44140625, 41388.5390625, 41408.95703125,
    ],
  };

  const handleRelayout = (eventdata) => {
    // console.log("Zoom event:", eventdata);

    if (
      eventdata["xaxis.range[0]"] &&
      eventdata["xaxis.range[1]"] &&
      eventdata["yaxis.range[0]"] &&
      eventdata["yaxis.range[1]"]
    ) {
      console.log(
        `X-axis range: ${eventdata["xaxis.range[0]"]} to ${eventdata["xaxis.range[1]"]}\nY-axis range: ${eventdata["yaxis.range[0]"]} to ${eventdata["yaxis.range[1]"]}`
      );
    }
  };

  const downloadRef = useRef(null);

  const handleDownload = async () => {
    const element = downloadRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);

    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, "-");
    const fileName = `Graph_${formattedDate}.pdf`;
    pdf.save(fileName);
  };

  return (
    <div className="w-full h-full flex flex-col items-start  ">
      <button
        onClick={handleDownload}
        className="bg-violet-400 px-2 py-1 rounded-lg mb-3 text-white cursor-pointer self-end "
      >
        Download
      </button>
      <div ref={downloadRef} className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10 relative">
          {/* Bar Graph */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Plot
              data={Object.keys(yValues).map((year) => ({
                x: xvalue,
                y: yValues[year],
                type: "bar",
                name: year,
              }))}
              layout={{
                height: 400,
                xaxis: {
                  title: {
                    text: "X axis",
                  },
                },
                yaxis: {
                  title: {
                    text: "Y axis",
                  },
                },
                title: {
                  text: "Bar Graph",
                  font: {
                    size: 20,
                    weight: "bold",
                    family: "inherit",
                    color: "#222",
                  },
                  x: 0.1,
                  xanchor: "left",
                  y: 0.95,
                  yanchor: "top",
                },
                margin: { t: 100 },
                barcornerradius: 10,
                barmode: "stack",
              }}
              onRelayout={handleRelayout}
              config={{
                displayModeBar: false,
              }}
              useResizeHandler={true}
              style={{
                width: "100%",
                borderRadius: "30px",
                overflow: "hidden",
              }}
            />
          </div>
          {/* Pie Chart */}
          <div className="w-full lg:w-1/2 flex justify-center items-center ">
            <Plot
              data={[
                {
                  values: [19, 26, 45, 10],
                  labels: ["Residential", "Non-Residential", "Utility", "xyz"],
                  marker: {
                    colors: ["#5932EA", "#C6B3F7", "#E7E1FB", "#8257ED"],
                  },
                  type: "pie",
                  name: "Donut",
                  hoverinfo: "label+percent+name",
                  textinfo: "none",
                  hole: 0.6,
                  direction: "clockwise",
                },
              ]}
              layout={{
                height: 400,
                title: {
                  text: "Title",
                  font: {
                    size: 20,
                    weight: "bold",
                    family: "inherit",
                    color: "#222",
                  },
                  x: 0.1,
                  xanchor: "left",
                  y: 0.95,
                  yanchor: "top",
                },
                margin: { t: 60 },
              }}
              onRelayout={handleRelayout}
              config={{
                displayModeBar: false,
              }}
              useResizeHandler={true}
              style={{
                width: "100%",
                borderRadius: "30px",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <Plot
            data={Object.keys(yValues).map((key, index) => ({
              x: xvalue,
              y: yValues[key],
              type: "scatter",
              mode: "lines",
              line: {
                color:
                  ["#C6B3F7", "#6E4CEE", "#5932EA", "#8257ED"][index] ||
                  "#000000",
                width: index === 0 ? 2 : 2,
                shape: "spline",
              },
              name: key,
            }))}
            layout={{
              height: 400,
              title: {
                text: "Multiple Line",
                font: {
                  size: 20,
                  weight: "bold",
                  family: "inherit",
                  color: "#222",
                },
                x: 0.1,
                xanchor: "left",
                y: 0.95,
                yanchor: "top",
              },
              xaxis: {
                title: {
                  text: "X-axis Title",
                },
                showgrid: false,
                zeroline: true,
                showline: true,
              },
              yaxis: {
                title: {
                  text: "Y-axis Title",
                },
                showline: false,
              },
            }}
            useResizeHandler={true}
            style={{
              width: "100%",
              borderRadius: "30px",
              overflow: "hidden",
            }}
            config={{
              displayModeBar: false,
            }}
            onRelayout={handleRelayout}
          />
        </div>
      </div>
    </div>
  );
}

export default Graph;
