async function fetchJson() {
    let response = await fetch('./data.json');
    let data = await response.json();
    return data;
}

const elem = document.getElementById('3d-graph');

var gData = await fetchJson();
  

const Graph = ForceGraph3D()(document.getElementById("3d-graph"))
  .nodeLabel("id")
  .nodeAutoColorBy("group")
  .graphData(gData)
  .onNodeClick(node => window.open(`${node.user}/${node.id}`, '_blank'));
/*if(x == 6){
  Graph.onNodeClick(node => window.open(`${node.user}/${node.id}`, '_blank'));
}
else{
  Graph.nodeVisibility(node => node.group == 1);
}*/



function filterNodes(inputval){

    var filter_num  = parseInt(inputval);
    const filteredNodes = gData.nodes.filter((n) => n.group == filter_num);
    console.log(filteredNodes);
    const filteredNodesIds = [];
    JSON.stringify(filteredNodes, (key, value) => {
    if (key === "id") filteredNodesIds.push(value);
    return value;
    });
    console.log(filteredNodesIds);
    const filteredLinks = gData.links.filter(
    (e) =>
    filteredNodesIds.includes(e.source.id) &&
    filteredNodesIds.includes(e.target.id)
    );
    console.log(filteredLinks);
    const filteredData = { nodes: filteredNodes, links: filteredLinks };
    console.log(filteredData);
    Graph.graphData(filteredData);
}
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  
  const inputVal = document.getElementById("inputBox").value;
  filterNodes(inputVal);
});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", function(event) {
  event.preventDefault();
  
  const inputVal = document.getElementById("inputBox").value;
  Graph.graphData(gData);
});
