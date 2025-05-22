# @peetersfr/node-red-contrib-context-flex

This Node-RED module provides nodes for setting and getting context variables within your Node-RED flows using either the node parameters or "msg.payload" as variable value and "msg.topic" as variable name and "msg.contextType" as context type ("global" or "flow").

## Description

Node-RED offers powerful capabilities for data processing and flow control. Context variables serve as a means to store and access data across multiple nodes within a flow. The `set-context` node allows you to set context variables based on node parameters or incoming messages, while the `get-context` node retrieves context variables based on node parameter or specified topics.

## Installation

You can install this Node-RED module using the Node-RED Palette Manager, or by manually copying the module files to the appropriate directory.

## Usage

### Set Context Node ("set-context")

The "set-context" node sets context variables based on node parameters or incoming messages. It provides the option to specify whether the context variable should be stored in the flow or global context. This node is useful for dynamically updating context variables based on the data received by your flow.
The node parameters are the following:
- **Name**: name of the node
- **Context Type**: flow or global
- **Variable**: name of the variable to be set

### Get Context Node ("get-context")

The "get-context" node retrieves context variables based on specified topics. It allows you to access context variables stored in either the flow or global context. This node is helpful for fetching context variables and using them within your flow for decision-making or data processing.
The node parameters are the following:
- **Name**: name of the node
- **Context Type**: flow or global
- **Variable**: name of the variable to be retrieved
- **Debug**: option to issue error in the console or not (node status will be updated anyway).

## Behavior

### Set Context Node:

1. **Receiving Messages**: Listens for incoming messages.
2. **Extracting Data**: Parses the incoming message to extract the variable name and value from "msg.topic",  "msg.payload", and "msg.contextType" respectively.
3. **Setting Context Variable**: Sets the context variable based on the extracted variable name and value or node parameters if the "msg.topic" and/or "msg.contextType" are empty.
4. **Node parameters**: Allows the user to specify the name and context type of the variable - they will be overridden by the "msg" parameters.
5. **Status Update**: Updates the node status to indicate whether the variable is successfully set or if there are any errors.
6. **Output**: retreives the value of the set message using the get function.

### Get Context Node:

1. **Receiving Requests**: Listens for incoming messages.
2. **Extracting Data**: Parses the incoming message to extract the variable name and value from "msg.topic" and "msg.contextType" respectively.
3. **Retrieving Context Variable**: Retrieves the context variable based on the specified variable name and context or node parameters if the "msg.topic" and/or "msg.contextType" are empty.
4. **Node parameters**: Allows the user to specify the name and context type of the variable - they will be overridden by the "msg" parameters.
5. **Status Update**: Updates the node status to indicate whether the variable is successfully retrieved
6. **Error**: error issue if the debug option is selected.
4. **Output**: Sends the retrieved context variable as "msg.payload" to the next node in the flow.

These operations allow users to dynamically set and retrieve context variables within their Node-RED flows, enabling flexible data processing and flow control.

## License

This module is licensed under the GNU General Public License, Version 3.0. See the [LICENSE](LICENSE) file for details.

## Author

- **peetersfr**

## Thanks

These nodes are based on the work of 

- **Harshad Joshi**
- GitHub: [hj91](https://github.com/hj91)
