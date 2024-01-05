/* VisualizationPage.tsx
Manages state for various aspects of the neural network visualization 
(like layers, nodes, and neuron glow information) and handles data 
fetching from the backend. It also organizes sub-components on the page.
*/

import React, { useState, useEffect } from "react";
import {
  Menu,
  TopBgWindow,
  UploadButtonSm,
  InsightsWindow,
  BotBgWindow,
  GraphViewingWindow,
} from "../../components";
import graphic2 from "../../assets/graphic2.png";

const VisualizationPage = () => {
  const [layers, setLayers] = useState<number | 0>(0);
  const [hiddenLayers, setHiddenLayers] = useState<number | 0>(0);
  const [nodes, setNodes] = useState<number[]>([]);
  const [layerTypes, setLayerTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [neuronGlowInfo, setNeuronGlowInfo] = useState<{
    [key: string]: number[];
  }>({});
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null); // Added state for managing selected insight
  console.log("Selected Insight:", selectedInsight); // TEST LINE
  const [insightsContent, setInsightsContent] = useState<string[]>([]); // Added state for managing insights content
  const [error, setError] = useState<string | null>(null);

  const checkGraphStatus = async () => {
    console.log("Checking graph status...");
    try {
      const response = await fetch(
        "http://localhost:8000/playground/model_to_graph"
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Data fetched:", data);

        // Check if data is valid before updating states and loading
        if (
          data.results.layers > 0 ||
          data.results.hiddenLayers > 0 ||
          data.results.nodes.length > 0
        ) {
          setLayers(data.results.layers);
          setHiddenLayers(data.results.hiddenLayers);
          setNodes(data.results.nodes);
          setLayerTypes(data.results.layerTypes);
          setNeuronGlowInfo(data.results.neuronGlowInfo);
          setLoading(false); // Set loading to false only if data is valid
        }
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  console.log("Visualization Props:", {
    layers,
    hiddenLayers,
    nodes,
    layerTypes,
    neuronGlowInfo,
  }); // Debugging line

  // Single useEffect for polling
  useEffect(() => {
    const interval = setInterval(() => {
      if (loading) {
        checkGraphStatus();
      }
    }, 2000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, [loading]); // Dependency array with only 'loading'

  const neuralNetworkProps = {
    layers,
    hiddenLayers,
    nodes,
    layerTypes,
    neuronGlowInfo,
  };

  const layerTypeDescriptions = {
    Conv2D:
      "This type of layer is like a filter that helps in highlighting features from images, such as edges and shapes.",
    AveragePooling2D:
      "These layers help in reducing the size of the image data by averaging the values in a certain area, making the model more manageable.",
    Flatten:
      "Imagine taking a multi-layered object and squashing it into a single layer. This layer does just that with data, preparing it for further processing.",
    Dense:
      "Think of this as a regular, core building block in a network where each input is connected to each output by a line.",
    // Add more layer types and descriptions as needed
  };

  const updateInsightsWindow = (layerType) => {
    console.log("Received layer type:", layerType);
    const description =
      layerTypeDescriptions[layerType] || "Description not available.";
    const formattedInfo = [
      `Layer Type: ${layerType}`,
      `Description: ${description}`,
    ];
    setInsightsContent(formattedInfo);
  };

  const renderInsightsContent = () => {
    switch (selectedInsight) {
      case "Layer Insights":
        return (
          <InsightsWindow title="Layer Insights" content={insightsContent} />
        );
      case "Neuron Insights":
        return (
          <InsightsWindow
            title="Neuron Insights"
            content={["Neuron-specific insights here"]}
          />
        );
      case "LIME Insights":
        return (
          <InsightsWindow
            title="LIME Insights"
            content={["LIME-specific insights here"]}
          />
        );
      case "SHAP Insights":
        return (
          <InsightsWindow
            title="SHAP Insights"
            content={["SHAP-specific insights here"]}
          />
        );
      default:
        return null; // Or some default content
    }
  };

  return (
    <div className="relative bg-primary_bg min-h-screen overflow-hidden">
      {/* Background Graphic */}
      <img src={graphic2} alt="Graphic 2" className="z-0 mx-auto pt-14" />

      {/* Menu Container */}
      <div className="absolute top-0 left-0 p-1">
        <Menu></Menu>
      </div>
      {/* TopBgWindow Container */}
      <div className="absolute top-16 mt-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 mr-16">
        <TopBgWindow></TopBgWindow>
        {/* UploadButton Container */}
        <div className="absolute top-0 mt-11 left-3/4">
          <UploadButtonSm></UploadButtonSm>
        </div>
      </div>
      {/* GraphViewingWindow Container */}
      <div className="absolute top-52 right-1/2">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <GraphViewingWindow
            {...neuralNetworkProps}
            selectedInsight={selectedInsight}
            onUpdateInsights={updateInsightsWindow}
          />
        )}
      </div>
      {/* InsightsWindow Container */}
      <div className="absolute top-52 left-1/2 ml-5">
        {renderInsightsContent()}
      </div>
      {/* BotBgWindow Container */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1">
        <BotBgWindow onInsightSelect={setSelectedInsight}></BotBgWindow>
      </div>
    </div>
  );
};

export default VisualizationPage;
