/**

Copyright 2025 peetersfr, Court-St-Etienne

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/

module.exports = function(RED) {
    function SetContextNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var targetContextType = "";
		var targetVariableName = "";
		var value;

        this.contextType = config.contextType;

        node.on('input', function(msg) {
            // Check if context type is set correctly in the message
            if (msg.contextType === "flow" || msg.contextType === "global") {
				targetContextType = msg.contextType;
            } else if (msg.contextType) {
				node.error("Invalid context type passed in msg.contextType", msg);
                node.status({fill:"red",shape:"ring",text:"Invalid context type"});
			} else {
				// If the contextType message proriety is empty, check if context type is set correctly in the node configuration
				if (config.contextType === "flow" || config.contextType === "global") {
					targetContextType = config.contextType;
				}
				else {
					node.error("Invalid context type selected", msg);
					node.status({fill:"red",shape:"ring",text:"Invalid context type"});
				}
			}
			// Check if context variable name is set correctly in the message
            if (msg.topic) {
				targetVariableName = msg.topic;
            } else if (config.contextVariable) {
				// If the contextVariable message proriety is empty, check if variable name is set correctly in the node configuration
				targetVariableName = config.contextVariable;
			}
			else {
                node.error("Empty context variable name", msg);
                node.status({fill:"red",shape:"ring",text:"Invalid context type"});
            }
			if (targetContextType && targetVariableName) {
				if (targetContextType == "global") {
					node.context().global.set(targetVariableName, msg.payload);
					value = node.context().global.get(targetVariableName);
				}
				else {
					node.context().flow.set(targetVariableName, msg.payload);
					value = node.context().flow.get(targetVariableName);
				}
				msg.payload = value;
				node.send(msg);
				node.status({fill:"green",shape:"dot",text:"Context variable set"});
			}
        });
    }
    RED.nodes.registerType("set-context",SetContextNode);
}