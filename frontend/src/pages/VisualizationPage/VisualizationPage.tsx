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
          <GraphViewingWindow {...neuralNetworkProps} />
        )}
      </div>
      {/* InisightsWindow Container */}
      <div className="absolute top-52 left-1/2 ml-5">
        <InsightsWindow></InsightsWindow>
      </div>
      {/* BotBgWindow Container */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1">
        <BotBgWindow></BotBgWindow>
      </div>
    </div>
  );
};

export default VisualizationPage;
