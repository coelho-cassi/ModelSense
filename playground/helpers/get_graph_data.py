from tensorflow.keras.models import load_model
import numpy as np
import json
import os

def get_model_data(model):
    model_data = {
        "layers": len(model.layers),
        "hidden_layers": 0,
        "layer_types": [],
        "nodes": []
    }

    for layer in model.layers:
        layer_type = layer.__class__.__name__
        model_data["layer_types"].append(layer_type)

        if 'Input' not in layer_type:
            model_data["hidden_layers"] += 1
            
        if hasattr(layer, 'units'):
            model_data["nodes"].append(layer.units)
        elif hasattr(layer, 'filters'):
            model_data["nodes"].append(layer.filters)
        else:
            model_data["nodes"].append(0)
    
    return model_data

def get_top_neurons(glow_values, N):
    sorted_indices = np.argsort(glow_values)[::-1]
    top_indices = sorted_indices[:N]
    return top_indices

# Load your model
my_model = os.listdir('../../media/uploads')[0]
model = load_model('../../media/uploads/' + my_model)

# Get model data
model_data = get_model_data(model)

# Calculate "glow" values and find top neurons
top_percentage = 0.2  # for top 20%
neuron_glow = [None] * len(model.layers)  # Initialize a list with None for each layer
top_neurons_by_layer = [None] * len(model.layers)

for layer_index, layer in enumerate(model.layers):
    if hasattr(layer, 'get_weights') and len(layer.get_weights()) > 0:
        weights, biases = layer.get_weights()
        if 'conv' in layer.name.lower() or 'dense' in layer.name.lower():
            glow_values = np.sum(np.abs(weights), axis=tuple(range(weights.ndim - 1)))
            neuron_glow[layer_index] = glow_values
            N = max(int(len(glow_values) * top_percentage), 1)
            top_indices = get_top_neurons(glow_values, N)
            top_neurons_by_layer[layer_index] = top_indices

# Combine model data with top neuron indices
combined_data = {
    "model_info": model_data,
    "neuron_glow_info": {}
}

for layer_index, neuron_indices in enumerate(top_neurons_by_layer):
    if neuron_indices is not None:
        combined_data["neuron_glow_info"][layer_index] = list(map(int, neuron_indices))

combined_data["results"] = {
    "layers": combined_data["model_info"]["layers"] + 2,
    "hiddenLayers": combined_data["model_info"]["hidden_layers"],
    "nodes": combined_data["model_info"]["nodes"],
    "layerTypes": combined_data["model_info"]["layer_types"],
    "neuronGlowInfo": combined_data["neuron_glow_info"]
}

# Convert to JSON string and save to a file
json_data = json.dumps(combined_data, indent=4)
with open("../../media/generated_data/combined_model_data.json", "w") as file:
    file.write(json_data)

print("Data saved to combined_model_data.json")
